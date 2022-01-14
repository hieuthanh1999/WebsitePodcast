let namecheck = sessionStorage.getItem('user');
if(namecheck){
    checkrankusser();
}
//kiểm tra số lượng xem blog của user và kiểm tra rank hiện tại của usesr để update
async function checkrankusser(){
    let datarankuser = await fetch('http://localhost:8000/updaterank');
    let usercheck = await fetch('http://localhost:8000/user' + "/" + idusersetrank);
      if(datarankuser.status === 200){
        let apirank = await datarankuser.json();
        let apirankuser = await usercheck.json();
        console.log("sadsadsdssdsdsadasdsdsa");
        console.log(apirankuser);
        var checkrank = apirank.filter(function(user) {
          return user.id_user == idusersetrank;
        });
        var datas={};
        if(checkrank.length == 5 && apirankuser.ranker < 2){
            var datas =  {
                "name": apirankuser.name,
                "email": apirankuser.email,
                "password": apirankuser.password,
                "phone":apirankuser.phone,
                "avatar": apirankuser.avatar,
                "type": apirankuser.type,
                "ranker": "2"
            }
            let rankcheck = "2"
            updateuser(datas,idusersetrank, rankcheck );
        }else if(checkrank.length == 10 && apirankuser.ranker < 3){
            var datas =  {
                "name": apirankuser.name,
                "email": apirankuser.email,
                "password": apirankuser.password,
                "phone":apirankuser.phone,
                "avatar": apirankuser.avatar,
                "type": apirankuser.type,
                "ranker": "3"
            }
            let rankcheck = "3"
            updateuser(datas,idusersetrank, rankcheck );
        }
      }
  }
  //hàm update user api
  async function updateuser(datas, iduser, ranker){
    VALUE = JSON.stringify(datas);
  
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
    myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
  
    fetch('http://localhost:8000/user' + '/' + iduser, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: VALUE
    })
    .then(function (responses) {
      if(ranker==2){
        alert("chúc mừng bạn  đã lên rank bạc!");
      }else if(ranker==3){
        alert("chúc mừng bạn  đã lên rank vàng!");
      }
      sessionStorage.setItem('ranker',ranker);
    })
    .catch((err) => {
      console.error(err);
    });
  
  }