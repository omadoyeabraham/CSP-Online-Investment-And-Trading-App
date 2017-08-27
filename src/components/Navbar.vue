<!--
  Thenavbar component displays a the client's name and the logout button

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

 <template>

    <nav class="nav w100p justify-content-between">

      <div class="ml10 no-gutters d-flex justify-content-between">
        <div class=" h-100 d-flex mr10">
           <span class="vert-center">
             <i class="fa fa-user fa-5x h-100 w100p" aria-hidden="true"></i>
          </span>
        </div>
        <div class="text-block h-100">
           <span class="welcome">Welcome, <span class="username">{{username}}</span> </span>
          <h6 class="logout-link">
            <i class="fa fa-sign-out" aria-hidden="true"></i>Logout
          </h6>
        </div>
      </div>

      <div class="text-center h-100 d-flex">
        <img class="logo mr20 vert-center" src="../assets/img/cardinalstone.png" alt="CardinalStone Logo">
      </div>
    </nav>

 </template>

 <script>
    export default {
      data () {
        return {
          username: 'Jonathan Badmus'
        }
      }
    }
 </script>

 <style scoped lang="sass">

    nav
      background: #EEE
    img.avatar
      height: 35px
    img.logo
      height: auto
    span.welcome
      font-size: 1.6rem
      color: rgb(26,33,85)
    span.username
      font-size: 3rem
    .logout-link
      font-size: 1.5rem
      color: #FE0000
    .text-block2
      display: flex
      flex-direction: column
      justify-content: center

 </style>

