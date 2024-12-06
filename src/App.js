import React from 'react'
import Layout from './components/Layout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function App() {

  return (
    <div>

      <ToastContainer
        position='top-center'
      />
      <Layout></Layout>
    </div>
  )
}
