import { Post, PostType } from './components/Post/Post'
import { Header } from './components/Header/Header'
import { Sidebar } from './components/Sidebar/Sidebar'

import styles from './App.module.css'
import './global.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/m-dantas.png',
      name: 'Mauricio Dantas',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' }
    ],
    publishedAt: new Date('2024-12-09 08:52:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernandes',
      role: 'Educator'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
      { type: 'link', content: '👉 jane.design/doctorcare' }
    ],
    publishedAt: new Date('2024-12-10 08:52:00')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar></Sidebar>    
        <main>
          {
            posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                />
              )
            })
          }
        </main>
      </div>
    </div>
  )
}


