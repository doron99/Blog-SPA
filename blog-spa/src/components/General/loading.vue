<template>
    <div class="centered" >
        loading...
    </div>
</template>

<script>
    export default {
        computed:{
           
        }
    }
</script>

<style scoped>
    .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color:rgba(0, 0, 0,50%);
    width:200px;
    height:200px;
    color:white;
    text-align: center;
    vertical-align: middle;
    line-height: 200px;
    z-index: 10;
    }

    .center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>