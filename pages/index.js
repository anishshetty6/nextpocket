import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [posts,setPosts] = useState([]);
  const loadPosts = async () => {
    pb.autoCancellation(false);
    const resultList = await pb.collection('posts').getList(1, 50, {
  });
setPosts(resultList.items) 
}
useEffect(() => {
  loadPosts()
})
return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     {
       posts.map((post) => {
         <div key={post.id}>
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{__html: post.description}} />
          </div>
       })
     }

     
    </main>
  );
}
