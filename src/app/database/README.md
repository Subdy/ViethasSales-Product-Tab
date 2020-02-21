
 import { FirebaseQuery, FirebaseAuth, FirebaseStorage, firebaseImage } from "../../databases/firebase.database";
 constructor(   
    private firebaseQuery: FirebaseQuery,
    private firebaseAuth: FirebaseAuth,
    private firebaseStorage: FirebaseStorage
  ){}


//------------------------------------LOGIN-----------------------------------------
//Lưu ý: khi năng nhập thành công ta lấy thông tin người đăng nhập vào bởi this.firebaseAuth.user 
this.firebaseAuth.doLogin(value)
    .then(
    res => {  
      console.log(res);   
      console.log(this.firebaseAuth.user);
      this.navCtrl.setRoot(MenuPage);  
    },
    err => {
      this.errorMessage = err.message;
    });


//-------------------------------------BOSS REGISTER----------------------------------
tryRegister(value){
  this.firebaseAuth.doRegister(value)
   .then(res => {
     console.log(res);
     this.errorMessage = "";
     this.successMessage = "Your account has been created. Please log in.";
   }, err => {
     console.log(err);
     this.errorMessage = err.message;
     this.successMessage = "";
   })
  }













//-------------------------------------EMPLOYEE REGISTER----------------------------------
//Lưu ý Chủ đăng nhập vào mới đăng ký được nhân viên  
//toàn bộ nhận viên tạo ra nằm trong collection employees
this.firebaseAuth.doRegister_Employee(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created. Please log in.";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })


//-------------------------------------RESET PASSWORK ----------------------------------
//Lưu ý: sau khi reset password, phản vô email để active và change new password
let emailAddress = 'abc@gmail.com';
    this.firebaseAuth.doReset_Password(emailAddress)
        .then(rest=>{
          if(rest) console.log('Email sent');
          else console.log('Can\'t reset password');
        });


//-------------------------------------DELETE EMPLOYEE----------------------------------
//Lưu ý Chủ đăng nhập vào mới xóa được nhân viên  
//toàn bộ nhận viên tạo ra nằm trong collection employees
this.firebaseAuth.deleteEmployee(id_employee)
    .then(res => {
      console.log(res);
    }, err => {
      console.log(err);       
    })















//----------------------------CÁCH PHÂN QUYỀN ĐỂ MỞ ĐƯỢC TRANG KHÁC-------------------------
//Example:
if(this.firebaseAuth.user.boss) this.navCtrl.push(DetailsPage);
else {
  if(this.firebaseAuth.user.detailspage) this.navCtrl.push(DetailsPage);
  else alert('You can\'t open this page');
}


//------------------------------------------NHƯNG LỆNH QUERY DÙNG CHUNG-----------------------------------------
//
// Lấy 1 record trong collection by id
this.firebaseQuery.getTask_byID(collection, id)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})




//---------------------------------------------------------------------------------------------------------------------
// Lấy tất cả các record trong collection
mang_a: any;
mang_a = new Array();
this.firebaseQuery.getTasks(collection) 
.then(res=>{
	for(let i =0; i< res.docs.length){
		if(){
			mang_a.push(res.docs[i].data());
			mang_a[mang_a.length - 1].id = res.docs[i].id;
		}
	}
})
.catch(err=>{
	//alart(err);
})

//-----------------------------------LẤY CÁC FIELD TRONG 1 COLLECTION----------------
//
this.firebaseQuery.getTasks_Field(collection, field, val, condition)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})


//
this.firebaseQuery.getTasks_2Field(collection, field1, val1, condition1, field2, val2, condition2)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})


//
this.firebaseQuery.getTasks_3Field(collection, field1, val1, condition1, field2, val2, condition2, field3, val3, condition3)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})

//
this.firebaseQuery.getTasks_4Field(collection, field1, val1, condition1, field2, val2, condition2, field3, val3, condition3, field4, val4, condition4)
.then(res=>{
  ----------------
},
err=>{
  ----------------
})
.catch(error=>{
  ----------------
})


//---------------------------------------------------------------------------------------------------------------------
let data = {...item};
data.new = val;
delete data.id;
this.firebaseQuery.updateTask(collection, id, data)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})


//
this.firebaseQuery.deleteTask(collection, id)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})




//-----------------------------------------------------------------------------------------------------------------
let data ={
	a: x,
	b: y,
	c: z
};
this.firebaseQuery.createTask(collection,data)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})



//------------------------------------------------------------------------------------------------------------------
//Trường hợp lấy dữ liệu theo thời gian hiện tại
  let endtime = new Date('2019-12-10T05:24:00');
  let starttime = new Date('2019-12-09T05:24:00');
//Trường hợp lấy dữ liệu theo thời gian lịch trên APP
starttime: any;
endtime: any;

ionchangeStartime($event_start){    
	this.starttime = new Date($event_start.year, $event_start.month - 1, $event_start.day, $event_start.hour, $event_start.minute);  	
}

ionchangeEndtime($event_end){ 	
	 this.endtime = new Date($event_end.year, $event_end.month - 1, $event_end.day, $event_end.hour, $event_end.minute);    
}

this.firebaseQuery.getTasks_2Field('abc', 'timestamp', this.starttime, '>=', 'timestamp', this.endtime, '<=')
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})



//-----------------------------------QUERY 2 FIELD 2 COLLECTION-----------------------------------------
this.firebaseQuery.getTasks_2Field_2Collection(collection1, field1, val1, condition1, collection2, field2)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})

//Example:
this.firebaseQuery.getTasks_2Field_2Collection('table', 'id_area', 'IOd5aezssk2YGn0o9KdF', '==', 'bill', 'id_table')
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})



//-----------------------------------QUERY 4 FIELD 2 COLLECTION-----------------------------------------
this.firebaseQuery.getTasks_4Field_2Collection(collection1, field1, val1, condition1, collection2, field2, field3, val3, condition3, field4, val4, condition4)
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})

//Example:
this.firebaseQuery.getTasks_4Field_2Collection('table', 'id_area', 'IOd5aezssk2YGn0o9KdF', '==', 'bill', 'id_table', 'timestamp', this.starttime, '>=', 'timestamp', this.endtime, '<=')
.then(res=>{
	----------------
},
err=>{
	----------------
})
.catch(error=>{
	----------------
})


//-----------------------------------QUERY 5 FIELD 2 COLLECTION-----------------------------------------
this.firebaseQuery.getTasks_5Field_2Collection(collection1, field1, val1, condition1, collection2, field2, field3, val3, condition3, field4, val4, condition4, field5, val5, condition5)
.then(res=>{
  ----------------
})
.catch(error=>{
  ----------------
})

//Example:
let endtime = new Date();   
let starttime = new Date('2019-12-09T05:24:00');   
this.firebaseQuery.getTasks_5Field_2Collection('tables', 'id_area', 'id_gohome', '==', 'bills', 'id_table', 'date', starttime, '>=', 'date', endtime, '<=', 'status', true, '==')
.then(res => {      
   console.log(res);
   console.log(res[0]);
})
.catch(error=>{
  ----------------
});



//-----------------------------------QUERY 6 FIELD 3 COLLECTION-----------------------------------------
this.firebaseQuery.getTasks_6Field_3Collection(collection1, field1a, val1a, condition1a, collection2, field2a, val2a, condition2a, field2b, val2b, condition2b, field2c, val2c, condition2c, collection3, field3a, field3b)
.then(res=>{
  ----------------
},
err=>{
  ----------------
})
.catch(error=>{
  ----------------
})

//Example:  
let endtime = new Date();    
let starttime = new Date('2019-12-09T05:24:00');    
this.firebaseQuery.getTasks_6Field_3Collection('foods', 'id_menu', 'w7GqJzJciqmhCEHdMBoP', '==', 'bills', 'date', starttime, '>=', 'date', endtime, '<=', 'status', true, '==', 'detail_bills', 'id_food', 'id_bill')
.then(snapshot => {      
   console.log(snapshot);
   console.log(snapshot[0].id);
   console.log(snapshot[0].data());
},
err=>{
  ----------------
})
.catch(error=>{
  ----------------
});






//-----------------------------------IMAGE-------------------------------------------------------
//upload hình lên firebase theo kích thước hình gốc 
this.firebaseImage.uploadImage(image, randomId).then(imageURL => {      
  this.image = imageURL;    
  this.toastCtrl.create({
    message: "Image was updated successfully",
    duration: 3000
  }).then(toast=>toast.present());   
});

//upload hình lên firebase giãn nỡ hình theo kích thước mới w, h
this.firebaseImage.uploadThumbnail(image, randomId, w, h).then(thumbnailURL => {    
    this.thumbnail = thumbnailURL;    
    this.toastCtrl.create({
      message: "Thumbnail was updated successfully",
      duration: 3000
    }).then(toast=>toast.present());  
});	

//Example: upload hình ảnh từ album điện thoại lên firebase
openImagePicker(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){        
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err)
        );
      }
    }, (err) => {
      console.log(err);
    });
  }

  async uploadImageToFirebase(image){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    const toast = await this.toastCtrl.create({
      message: 'Image was updated successfully',
      duration: 3000
    });
    this.presentLoading(loading);
    let image_src = this.webview.convertFileSrc(image);
    let randomId = Math.random().toString(36).substr(2, 5);

    //uploads img to firebase storage
    this.firebaseImage.uploadThumbnail(image_src, randomId, 128, 128)
    .then(photoURL => {
      this.thumbnail = photoURL;
      loading.dismiss();
      toast.present();
    }, err =>{
      console.log(err);
    })
  }

  async presentLoading(loading) {
    return await loading.present();
  }

//delete image
this.firebaseImage.deleteImage(imageNAME).then(success =>{
	console.log(success);
})
.catch(error =>{
	console.log(error);
});

//delete thumbnail
this.firebaseImage.deleteThumbnail(thumbnailNAME).then(success =>{
	console.log(success);
})
.catch(error =>{
	console.log(error);
});






//----------------------------------------------MÁY IN NHIỆT--------------------------------------------------
//ionic cordova plugin add cordova-plugin-chrome-apps-common@^1.0.7
//ionic cordova plugin add cordova-plugin-chrome-apps-sockets-tcp@^1.3.7
//npm install html2canvas@^1.0.0-rc.1
//npm install rxjs@^5.5.0
//rxjs@^6 loi img.onload

//example:
let CashierPrinter = {
  ip: '192.168.1.166',
  port: '9100'
};
const div = xmlDoc.getElementById("invoice"); 
this.driver.printInvoice(CashierPrinter, div);