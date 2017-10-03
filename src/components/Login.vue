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

                  <v-snackbar
                    :timeout="timeout"
                    :top="y === 'top'"
                    :bottom="y === 'bottom'"
                    :right="x === 'right'"
                    :left="x === 'left'"
                    :multi-line="mode === 'multi-line'"
                    :vertical="mode === 'vertical'"
                    v-model="snackbar"
                    class="red darken-4"
                  >
                    <v-container fluid class="pl5 pr20">
                      <v-layout row>

                        <v-flex xs10 class="d-flex align-center">
                          {{text}}
                        </v-flex>

                        <v-flex xs2 class="">
                          <v-btn flat class="white--text" @click.native="snackbar = false">
                            <v-icon class="white--text">close</v-icon>
                          </v-btn>
                        </v-flex>

                      </v-layout>
                    </v-container>
                  </v-snackbar>

            <form class="form-signin">

                 <v-alert error
                  icon="new_releases" :value="true"
                  v-if="authError">
                  Invalid Username or Password
                 </v-alert>

                <v-text-field
                  label="Username"
                  :append-icon="'account_circle'"
                  v-model="username"
                  :rules="usernameRules">
                </v-text-field>
                <v-text-field
                  label="Password"
                  v-model="password"
                  :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hidePassword = !hidePassword)"
                  :type="hidePassword ? 'password' : 'text'"
                  :rules="passwordRules">
                </v-text-field>

                <v-btn info class="blue darken-4 font-size-13 mt10"
                  @click="login">
                SIGN IN
                </v-btn>

            </form>
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
  import {mapState} from 'vuex'
  import * as mutationTypes from '../store/mutation-types'
  import {AuthenticationService} from '../services/AuthenticationService';
  import { required } from 'vuelidate/lib/validators'

  export default
  {

    beforeDestroy () {
      // Clear the authentication error message incase it's been set
      this.$store.commit(mutationTypes.CLEAR_AUTHENTICATION_ERROR_MESSAGE)
    },

    data () {
      return {
        name: 'CardinalStone Trade Direct',
        username: '',
        password: '',
        hidePassword: true,
        usernameRules: [
          (username) => !!username || 'Required'
        ],
        passwordRules: [
          (password) => !!password || 'Required'
        ],
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 10,
        text: 'Invalid Username or Password'
      }
    },

    computed: {
      ...mapState({
        'authError': (store) => store.errors.authenticationErrorMessage
      })
    },

    methods: {

      // Login the user
      login: function () {
        AuthenticationService.login(this.username, this.password)
      }

    },

    validations: {
      username: {
        required
      },
      password: {
        required
      }
    }

  }
</script>

<!-- Scoped styles apply only to this component -->
<style scoped>
  .is-danger {
    background: red
  }
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
