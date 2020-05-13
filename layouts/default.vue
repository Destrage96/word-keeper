<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" :active-name="active">
          <div class="layout-nav">
            <MenuItem name="index" :to="{name: 'index'}">
              <font-awesome-icon far icon="home"/>
              Word keeper
            </MenuItem>
            <MenuItem name="starred" :to="{name: 'starred'}">
              <font-awesome-icon far icon="star"/>
              Starred words
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', background: '#fff'}">
            <nuxt/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    computed: {
      active() {
        return this.$route.name;
      }
    }
  }
</script>

<style lang="less">
  .layout{
    height: 100%;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .layout-nav{
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0 30px;
    }
  }
</style>

