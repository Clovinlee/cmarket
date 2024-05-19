// useWindowSize.js
import { ref, onMounted, onUnmounted } from 'vue';

function windowScreenSize(mobileWidth = 576) {
    let isMobile = ref(false);
    // Base value
    isMobile.value = window.innerWidth <= mobileWidth;
    // console.log(window.innerWidth, mobileWidth, isMobile.value);
    const refreshScreenSize = function (e) {
        isMobile.value = e.target.innerWidth < mobileWidth;
        // console.log(window.innerWidth, mobileWidth, isMobile.value);
    };
    
    onMounted(() => {
      window.addEventListener("resize", refreshScreenSize);
    });
    
    onUnmounted(() => {
      window.removeEventListener("resize", refreshScreenSize);
    });

    return {isMobile};
}

export {windowScreenSize}
