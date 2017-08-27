<!--
  The sidebar component displays a summary of the client's portfolio balance, and also serves as a navigation bar for the application

  @author Omadoye Abraham <omadoyeabraham@gmail.com>
 -->

 <template>

    <section class="sidebar h-100">

      <!-- Sidebar heading -->
      <div class="sidebar-header d-flex justify-content-between">
        <span >My Accounts</span>
        <span >
          <i class="fa fa-home" aria-hidden="true"></i>
        </span>
      </div>

      <!-- Sidebar accounts summary section -->
      <div class="sidebar-accounts d-flex flex-column">
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>Stockbroking</span>
          <span>N100,000,000</span>
        </div>
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>Fixed Income</span>
          <span>N100,000,000</span>
        </div>
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>Dollar Investments</span>
          <span>N100,000,000</span>
        </div>
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>SMA</span>
          <span>N100,000,000</span>
        </div>
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>Structured Inv Plan</span>
          <span>N100,000,000</span>
        </div>
        <div class="sidebar-account">
          <span><i class="fa fa-suitcase" aria-hidden="true"></i>Cash Account</span>
          <span>N100,000,000</span>
        </div>
      </div>



    </section>

 </template>

 <script>
    export default {

    }
 </script>

 <style scoped lang="sass">
    .sidebar
      border: 2px solid #eee
      .sidebar-header
        font-size: 2.5rem
        margin: 5px
        margin-bottom: 0
        border-bottom: 1px solid rgb(204,204,204)
      .sidebar-account
        display: flex
        justify-content: space-between
        padding: 5px 1px
        font-size: 1.3rem
        border-bottom: 1px solid #fff
        color: #1a2155
        &:hover
          background: #CCC
          cursor: pointer
        .fa
          margin-right: 5px

 </style>

