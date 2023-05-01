import {LoginUserInfo} from '../../models/LoginUserInfo'

export async function loginCheck():Promise<boolean>{
    let ret = true;
    await fetch('https://localhost:8080/api/user/logincheck', {
        method: 'GET',
        credentials: 'include',
        //mode: 'cors',
        //headers:{"Content-Type": "application/x-www-form-urlencoded"},
        //mode:"no-cors",
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Not authenticated');
          }
        })
        .then((resJson) => {
          if (resJson.loginStat) {
            return true;
          } else {
            throw new Error('Not authenticated');
          }
        })
        .catch((error) => {
          console.log(error);
          ret = false;
        });
    return ret;
}

export async function getLoginUserInfo():Promise<LoginUserInfo>{
  const ret:LoginUserInfo ={
    _id:"",
    email:"",
    name:"",
    usertype:""
  }
  await fetch('https://localhost:8080/api/user/getloginuserinfo', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not authenticated');
        }
      })
      .then((resJson) => {
        ret._id=resJson._id;
        ret.email=resJson.email;
        ret.name=resJson.name;
        ret.usertype=resJson.usertype;
      })
      .catch((error) => {
        console.log(error);
      });
  return ret;
}