import { Button, Input, Table, Space, Popconfirm } from 'antd'
import React from 'react'
import './App.css'
import axios from 'axios'

const { Search } = Input //从 input 中【🌟🌟解构】并获取 Search 组件

//思路：
//1.找到对应的组件，搭建基本【布局结构（无数据状态）】
//2.渲染基础的 table ：【发起请求（需要提前 Mock 数据）】 (componentDidMount) -> 【拿到数据】 -> 【交给 List】(this.setState)
//3.写具体的业务逻辑，增删改查


//类组件内不能用 const、let，来定义变量，直接定义就好了

class App extends React.Component {
  state = {
    //表格数据
    list: [],
    //定义【每一列】要展示的数据结构,通常会把 【dataIndex】 跟 【key】 写成一样的
    columns: [
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
      },
    ]
  }

  // 搜索
  onSearch = (inputValue) => {
    console.log(inputValue);
  };


  // 删除


  //🌟🌟 定义加载列表的函数
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res);

    //🌟 把拿到的数据存到 state 的 list 内, 因为下面 render 内有调用 state.list
    this.setState({
      list: res.data
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
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        <Table
          //表格列数据
          dataSource={this.state.list}
          //表头数据
          columns={this.state.columns} 
        />;
      </div>
    )
  }
}

export default App
