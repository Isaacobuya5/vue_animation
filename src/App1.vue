<template>
<div class="container">
  <list-data></list-data>
</div>
  <div class="container">
    <div class="block" :class="animnatedBlock ? 'animate' : ''"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <!-----
  <transition>
    adds .enter-from (added first), .enter-to and .enter-active(same time as enter-from) classes to the wrapped element
    then removes enter-from but enter-active stays and enter-to is added when animation finishes.
    when removed, it adds .leave-from, , leave-active and leave-to (allow u to animate removal of element) classes
    - it isn't mounted initally
    customizing the css classes
    <transition name="para">

      .para-enter-to

      to use totally custom classes
      <transition enter-to-class="some-class"..../>

      transition events
      @before-enter
      @before-leave
      @enter - active class
      @after-enter - when animation finishes
      @leave- when 
      @after-leave
      arguments - element
      @enter-cancelled
      @leave-cancelled

      :css="false" - tells view that this transition won't use css but entire transition is used through javascript
      - doen't need to serch for respective css classes thus improves performance
  ---->
    <transition>
      <p v-if="paraIsVisible">This paragraph is only visible when...</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <!---
  adding animation with more than one children
  if at most one is added to the real dom at a time
  out-in - animate removal of a button first then animate addition of a button
  -->
  <div class="container">
    <transition name="fade-btn" mode="out-in" @before-enter="beforeEnter">
      <button @click="showUsers" v-if="!usersAreVisible">Show Users</button>
      <button @click="hideUsers" v-else>Hide Users</button>
    </transition>
  </div>
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogIsVisible: false,
      animnatedBlock: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterInterval: null,
      leaveInterval: null
    };
  },
  components: {
    // ListData,
  },
  methods: {
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animnatedBlock = true;
      console.log('clicked');
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    beforeEnter(el) {
      console.log('Before enter');
      // set up initial animation state
      el.style.opacity = 0;
    },
    enter(el, done) {
      let round = 1;
      this.enterInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.enterInterval);
          done(); // call to let view that this is finished
        }
      }, 20);
    },
    beforeLeave(el) {
      el.style.opacity = 1;
    },
    leave(el, done) {
      let round = 1;
      this.leaveInterval = setInterval(() => {
        el.style.opacity = 1 - round * 0.01;
        round++;

        if (round > 100) {
          clearInterval(this.leaveInterval);
          done(); // call to let view that this is finished
        }
      }, 20);
    },
    // prevent flickering
    enterCancelled() {
      clearInterval(this.enterInterval);
    },
    enterLeaved() {
      clearInterval(this.leaveInterval);
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
  /* transition: transform 2s ease-out; */
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}

.v-enter-from {
  /* opacity: 0;
transform: translateY(-30px); */
}

.v-enter-active {
  /* transition: all 0.3s ease-out;  no need of forwards coz this class is removed after animation*/
  animation: slide-scale 0.3s ease-out;
}

.v-enter-to {
  /* opacity: 1;
transform: translateY(0) */
}

.v-leave-from {
  /* opacity: 1;
transform: translateY(0) */
}

.v-leave-active {
  /* transition: all 0.3s ease-in; */
  animation: slide-scale 0.3s ease-out;
}

.v-leave-to {
  /* opacity: 0;
transform: translateY(30px); */
}

.animate {
  /* transform: translateX(-150px); */
  /* background-color: green; */
  animation: slide-fade 0.3s ease-out forwards;
}

@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }

  70% {
    transform: translateX(-120px) scale(1.1);
  }

  100% {
    transform: translateX(-150px) scale(1);
  }
}

.fade-btn-enter-from,
.fade-btn-leave-to {
  opacity: 0;
}

.fade-btn-enter-active {
  transition: opacity 0.3s ease-out;
}

.fade-btn-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-btn-enter-to,
.fade-btn-leave-from {
  opacity: 1;
}
</style>
