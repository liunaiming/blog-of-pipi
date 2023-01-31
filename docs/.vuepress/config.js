module.exports = {
  title: '日耕不辍,功不唐捐',
  description: '早晚有一天，你也能成为一个技术大佬',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'vue心得', 
      items: [
        { text: 'vue源码解析', link: '/vue/source/' },
        { text: 'vue常见问题', link: '/vue/issue/' }
      ]},
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      '/',
      '/vue',
      ['/page-b', 'Explicit link text']
    ]
  },
}