import { Button, Input, Table, Space, Popconfirm } from 'antd'
import React from 'react'
import './App.css'
import axios from 'axios'

const { Search } = Input //从 input 中【🌟🌟解构】并获取 Search 组件

//思路：
//1.找到对应的组件，搭建基本【布局结构（无数据状态）】
//2.渲染基础的 table ：【发起请求（需要提前 Mock 数据）】 (componentDidMount) -> 【拿到数据】 -> 【交给 List】(this.setState)
//3.写具体的业务逻辑：
  //3-1.删除逻辑 （点击哪个就用哪个 id，调用删除接口，重新拉取更新列表）
  //3-2.搜索逻辑 （拿到关键词，调用接口重新获取列表数据）


//类组件内不能用 const、let，来定义变量，直接定义就好了

class App extends React.Component {
  state = {
    
    list: [],//表格数据
    
    columns: [ //定义【每一列】要展示的数据结构,通常会把 【dataIndex】 跟 【key】 写成一样的
      {
        title: '任务编号',
        dataIndex: 'id',//编号 （对应的就是 json 的数据结构！）
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',//名称 （对应的就是 json 的数据结构！）
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',//描述 （对应的就是 json 的数据结构！）
        key: 'des',
      },
      {
        title: '操作',
        dataIndex: 'do',//操作 （对应的就是 json 的数据结构！此案例没有）
        key: 'do',
        render:(_,record)=>(//ant 封装好了，可以返回对应列表 _,record，包含 id
          <Space size="middle">  
            <Popconfirm  // 返回【操作按钮 popover】
                title="Sure to delete?"
                onConfirm={()=>this.deleteData(_,record)} //需要回调参数的话，就需要改写为🌟 ()=>this.XXX() 🌟的形式！！！ ant 封装好了，可以返回对应列表 record，包含 id
                >
                <a>删除</a>
            </Popconfirm>
          </Space>
        )
      },
    ]
  }



  // 搜索(ant 已经封装好了搜索方法,返回搜索值)
  onSearch = async(inputValue) => {
    console.log(inputValue);
    //调用搜索接口(每次请求的就是 inputValue 的数据，如果为空则返回所有数据)
    const res = await axios.get(`http://localhost:3001/data/?q=${inputValue}`);

    //把数据更新到 setState 内，更新数据
    this.setState({
      list:res.data //🔥因为 json 写的是 data 对象！
    })
  };


  


  // 删除,发送【异步请求函数】，调用删除接口 (接收 state 传入的 _,record 数据,ant 封装好了，可以返回对应列表 record，包含 id)
  deleteData = async(_,record) => {
    //调用删除接口
    await axios.delete(`http://localhost:3001/data/${record.id}`)

    //重新加载列表
    this.loadList()
  }

  



  //🌟🌟 定义加载列表的【异步请求函数】(定义请求数据的方法)
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res);

    //🌟 把拿到的数据存到 state 的 list 内, 因为下面 render 内有调用 state.list
    this.setState({
      list: res.data //🔥因为 json 写的是 data 对象！
    })
  }





  //🌟🌟 找到合适的【生命周期函数】,发送请求
  componentDidMount () {
    // 发送接口请求
    this.loadList()
  }




  render () {
    return (
      <div className="container">
        {/* <Button type='primary'>按钮</Button> */}

        {/* 搜索框，点击搜索图标、清除图标，或按下回车键时的回调，回调的 value 是当前输入框的值 */}
        <Search
          placeholder="请输入搜索关键词"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={this.onSearch}
          value={this.state.keyword}
        />
        <Table 
          //表格列数据
          dataSource={this.state.list}
          //表头数据
          columns={this.state.columns} 
          key= {this.state.columns.key}
          pagination={true}
        />;
      </div>
    )
  }
}

export default App
