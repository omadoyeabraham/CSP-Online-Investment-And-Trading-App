<!--
  This component displays the Login Page, and handles user authentication

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

<template>


  <div class="h-100" id="loginWrapper">
    <div class="container h-100 d-flex flex-column justify-content-center align-items-center">
       <div class="card card-container elevation-24">
            <img id="company-img" class="img-responsive" src="../assets/img/cardinalstone.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin">
                <input type="email" id="inputEmail" class="form-control" placeholder="Username" v-model="username" required autofocus>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
                <button @click="login" class="btn btn-lg btn-primary btn-block btn-signin" >Sign in</button>
            </form><!-- /form -->
            <a href="#" class="forgot-password">
                Forgot your password?
            </a>
			<p class="contact-company">
				<a href="#">
					Contact CardinalStone Help Desk
				</a>

			</p>
        </div><!-- /card-container -->
    </div><!-- /container -->
  </div>



</template>

<script>
  export default
  {
    data () {
      return {
        name: 'CardinalStone Trade Direct',
        username: '',
        password: ''
      }
    },

    methods: {
      login: function () {
        alert(`${this.username} ${this.password}`)
      }
    }

  }
</script>

<!-- Scoped styles apply only to this component -->
<style scoped>

  #loginWrapper {
    background-image: url('../assets/img/login-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .card-container.card {
    max-width: 450px;
    padding: 30px 40px;
  }

  input{
    min-width: 250px
  }

.btn {
    font-weight: 700;
    height: 36px;
    margin: 0px auto;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

/*
 * Card component
 */
.card {
    background-color: #F7F7F7;
    /* just in case there no content*/
    padding: 20px 25px 30px;
    *margin: 0 auto 25px;
    *margin-top: 20%;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

#company-img{
	margin: 0 auto;
}

/*
 * Form styles
 */
.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
}

.reauth-email {
    display: block;
    color: #404040;
    line-height: 2;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
    direction: ltr;
    height: 44px;
    font-size: 16px;
}

.form-signin input[type=email],
.form-signin input[type=password],
.form-signin input[type=text],
.form-signin button {
    width: 100%;
    display: block;
    margin-bottom: 10px;
    z-index: 1;
    position: relative;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.form-signin .form-control:focus {
    border-color: rgb(104, 145, 162);
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
	background-color: rgb(26,33,85); /*CardinalStone blue*/
    padding: 0px;
    font-weight: 700;
    font-size: 14px;
    height: 36px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    border: none;
    -o-transition: all 0.218s;
    -moz-transition: all 0.218s;
    -webkit-transition: all 0.218s;
    transition: all 0.218s;
}

.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
    background-color: rgb(71,77,118); /*A lighter shade of CardinalStone blue*/
}

.forgot-password {
    color: rgb(26,33,85); /*CardinalStone blue*/
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus{
    color: rgb(71,77,118); /*A lighter shade of CardinalStone blue*/
	text-decoration: none;
}

.contact-company{
	margin-top: 30px;
}

.contact-company a{
	color: rgb(26,33,85); /*CardinalStone blue*/
}

.contact-company a:hover{
	color: rgb(71,77,118); /*A lighter shade of CardinalStone blue*/
	text-decoration: none;
}
</style>
