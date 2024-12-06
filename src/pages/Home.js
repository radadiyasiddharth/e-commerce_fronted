import React from 'react'
import CategoryList from '../components/CategoryList'
import ProductBanner from '../components/ProductBanner'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

export default function Home() {
  return (
    <div>
      <CategoryList/>
      <ProductBanner/>

      <HorizontalCardProduct category={"Airpodes"} heading={"Top's Airpods"}/>
      <HorizontalCardProduct category={"Watches"} heading={"Top's Watches"}/>

      <VerticalCardProduct category={"Mobile"} heading={"Top's Mobile"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Top's Mouse"}/>
      <VerticalCardProduct category={"Televisions"} heading={"Top's Televisions"}/>
      <VerticalCardProduct category={"Camera"} heading={"Top's Camera & Photography"}/>
      <VerticalCardProduct category={"Earphones"} heading={"Top's Wired Earphones"}/>
      <VerticalCardProduct category={"Speakers"} heading={"Top's Bluetooth Speakers"}/>
      <VerticalCardProduct category={"Refrigerator"} heading={"Top's Refrigerator"}/>
      <VerticalCardProduct category={"Trimmers"} heading={"Top's Trimmer"}/>
      <VerticalCardProduct category={"Printers"} heading={"Top's Printer"}/>
      <VerticalCardProduct category={"Processor"} heading={"Top's Processor"}/>
    </div>
  )
}
