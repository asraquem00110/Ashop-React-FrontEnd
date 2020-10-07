import React , { useEffect }  from 'react'
import './index.css'
import UserNav from './nav'
import {setnav} from './setnav.js'
import {Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {getInfo as getUserInfo} from '../../actions/user'

const UserComponent = (props) =>{
    const dispatch = useDispatch()
    const userinfo = useSelector(state=>state.user.userinfo)

    useEffect(()=>{
        setnav(0)
        dispatch(getUserInfo())
    },[])

    return (
        <div id="MainBody">
            <UserNav />
            <br/>
            <h1>My Profile</h1>
            <Table bordered variant="dark">
                <tbody>
                    <tr>
                        <td style={{width: '20%'}}>FULLNAME</td>
                        <td>{userinfo.name}</td>
                    </tr>
                    <tr>
                        <td style={{width: '20%'}}>EMAIL ADDRESS</td>
                        <td>{userinfo.email}</td>
                    </tr>
                    <tr>
                        <td style={{width: '20%'}}>HOME ADDRESS</td>
                        <td>{userinfo.address}</td>
                    </tr>
                    <tr>
                        <td style={{width: '20%'}}>CONTACT NO</td>
                        <td>{userinfo.contact}</td>
                    </tr>
               
                </tbody>
            </Table>
        </div>
    )
}

export default UserComponent