<template>
  <v-card v-if="fob" flat color="#f4f4f4" class="pa-8">
    <v-card-title>
      <span>{{ fob.name }}</span>
      <v-btn
        v-if="props.active"
        color="primary"
        block
        variant="outlined"
        style="background-color: white;"
        @click="goToFob()"
      >
        Bekijk missieset
      </v-btn>
      <v-btn
        v-else
        color="primary"
        block
        @click="goToFob()"
      >
        Missieset instellen
      </v-btn>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
  import { useFobsStore } from '../../stores/fobs';
  interface Props {
    fobId?: string,
    active?: boolean,
  };
  
  const props = withDefaults(defineProps<Props>(), {
    fobId: null,
    active: false,
  })

  const fobsPinia = useFobsStore();

  const fob = computed(() => {
    if (!props.fobId) return null;
    return fobsPinia.getById(props.fobId);
  })

  const router = useRouter();

  function goToFob() {
    router.push({
      path: '/viewfob',
      query: { id: props.fobId },
    });
  };
</script>

<style lang="scss" scoped>
</style>
