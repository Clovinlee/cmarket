// useWindowSize.js
import { ref, onMounted, onUnmounted } from 'vue';

function windowScreenSize(mobileWidth = 576) {
    let isMobile = ref(false);
    // Base value
    isMobile.value = window.innerWidth <= mobileWidth;
    
    const refreshScreenSize = function (e) {
        isMobile.value = e.target.innerWidth < mobileWidth;
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
