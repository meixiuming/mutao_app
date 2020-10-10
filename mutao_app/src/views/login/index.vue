<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">沐淘商城后台管理系统</h2>
<!--        <div class="login_header_title">-->
<!--          <a href="javascript:;"  @click="loginWay=true">密码登录</a>-->
<!--          <a href="javascript:;"  @click="loginWay=false">短信登录</a>-->
<!--        </div>-->
        <div v-show="loginWay">
          <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名">
              <span slot="prefix">
                <svg-icon icon-class="user" class="color-main"/>
              </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                      autoComplete="on" placeholder="请输入密码">
              <span slot="prefix">
                 <svg-icon icon-class="password" class="color-main"/>
               </span>
              <span slot="suffix" @click="showPwd">
                <svg-icon icon-class="eye" class="color-main"/>
              </span>
            </el-input>
          </el-form-item>

        </div>
        <div v-show="!loginWay" >
          <el-form-item prop="phone">
            <el-input name="phone" type="text" v-model="loginForm.phone" autoComplete="on" placeholder="请输入手机号">
              <span slot="prefix">
                <svg-icon icon-class="phone" class="color-main"/>
              </span>
              <template slot="append">
                <button  class="get_verification"  @click.prevent="getCode()" v-text="computedTime>0?`已发送(${computedTime}s)`:'获取验证码'" ></button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="smsData">
            <!--@keyup.enter.native  键盘回车事件 -->
            <el-input name="smsData" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.smsData" autoComplete="on" placeholder="请输入验证码">
              <span slot="prefix">
                 <svg-icon icon-class="smsData" class="color-main"/>
               </span>
            </el-input>
          </el-form-item>

        </div>

        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
            登录
          </el-button>
          <el-button style="width: 45%" type="primary" @click.native.prevent="handleTry">
            获取微信好友
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
    <el-dialog title="二维码" :visible.sync="dialogVisible" :show-close="false" :center="true" width="30%">
      <div style="text-align: center">
        <span class="font-title-large"><span class="color-main font-extra-large">添加我</span>回复<span
          class="color-main font-extra-large">小明哥好</span>获取好友申请</span>
        <br>
        <img src="../../assets/images/weChart.png" width="160"
             height="160" style="margin-top: 10px">
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogConfirm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate';
  import {setSupport, getSupport, setCookie, getCookie} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (this.loginWay && !isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (this.loginWay && value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (!this.loginWay && !/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      };
      const validateSmsData = (rule, value, callback) => {
        if (!this.loginWay && value.length !== 6) {
          callback(new Error('验证码格式错误'))
        } else {
          callback()
        }
      };


      return {
        codeUrl: "",
        computedTime:0,
        loginForm: {
          username: '',
          password: '',
          phone:'',
          smsData:''
        },
        loginRules: {
          username: [{required: this.loginWay, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          phone: [{required: true, trigger: 'blur', validator: validatePhone}],
          smsData: [{required: true, trigger: 'blur', validator:  validateSmsData}]
        },
        loginWay: true,//false为短信登录true为密码登录，
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible: false,
        supportDialogVisible: false,


      }
    },
    created() {
      this.loginForm.username = getCookie("username");
      this.loginForm.password = getCookie("password");
      if (this.loginForm.username === undefined || this.loginForm.username == null || this.loginForm.username === '') {
        this.loginForm.username = 'admin';
      }
      if (this.loginForm.password === undefined || this.loginForm.password == null) {
        this.loginForm.password = '';
      }
    },
    watch:{

    },
    methods: {
      getCode() {
        getCodeImg().then(res => {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        });
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // let isSupport = getSupport();
            // if(isSupport===undefined||isSupport==null){
            //   this.dialogVisible =true;
            //   return;
            // }
            this.loading = true;
            console.log('调用后端登陆接口！');
            this.$store.dispatch('Login', this.loginForm).then(() => {
              console.log('调用结果！');
              this.loading = false;
              setCookie("username", this.loginForm.username, 15);
              setCookie("password", this.loginForm.password, 15);
              this.$router.push({ path: this.redirect || "/home" })
            }).catch(() => {
              console.log("哪里报错了");
              this.loading = false
              this.getCode();
            })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      toRegister() {
        this.$router.replace('/register')
      },
      dialogConfirm() {
        this.dialogVisible = false;
        setSupport(true);
      },
      dialogCancel() {
        this.dialogVisible = false;
        setSupport(false);
      },
      handleTry(){
        this.dialogVisible =true
      },
      //获取当前的computedTime, 并且用一个定时器
      getCode() {
        //点击已发送，当正在已发送的时候不需要再启动定时器
        if (this.computedTime == 0) {
          this.computedTime = 30
          var IntervalId = setInterval(() => {
            this.computedTime--
            if (this.computedTime <= 0) {
              clearInterval(IntervalId)
            }
          }, 1000)
        }
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
  .login-code {
    width: 35%;
    height: 38px;
    float: right;
  }
  .login-code.img {
    cursor: pointer;
    vertical-align: middle;
  }

  .login-code-img {
    height: 38px;
  }
</style>
