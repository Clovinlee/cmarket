<script setup lang="ts">
import { onMounted, ref, useSlots, watch } from 'vue';

const slots: string = (useSlots() as any).default()[0].children;

const props: Record<string, any> = defineProps({'maxSentenceLength':{
    type: Number,
    default: 60,
}});
const longTextArr: string[] = slots.split(" ");
const needReadMore = ref<boolean>(longTextArr.length > props.maxSentenceLength); //if false, then no need to show read more
const readMore = ref<boolean>(false);

const longText = slots;
const shortenedText: string = longTextArr.slice(0, props.maxSentenceLength).join(" ");

</script>

<template>
    <p>
        <!-- If READMORE mod active OR dont need read more, then just show LONG text -->
        {{ readMore || !needReadMore ? longText : shortenedText }}
        {{ readMore || !needReadMore ? '' : '...'}}
        <span v-if="needReadMore" class="pointer text-primary font-weight-bold" @click="readMore = !readMore">{{ readMore ? 'Read Less' : 'Read More' }}</span>
    </p>
</template>