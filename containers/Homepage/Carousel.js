import React from 'react'
import { Carousel } from 'antd';
import styled from 'styled-components'
import Slider from "react-slick";
import imgBanner from './image/img-banner.jpg'

const Item = styled.div`
    background-image: url(${props => props.image});
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center center;
    padding-top:53.908%;
    border-radius: 8px;
`
const CustomCarousel = styled.div`
  .antd-carousel{
    .slick-slide {
      text-align: center;
      background: #364d79;
      overflow: hidden;
 
    }

  }
  .slick-dots-bottom{
        justify-content: flex-start;
        li{
            width: 14px;
            height: 14px;
            button{
                background: #FFFFFF;
                border: 2px solid #BFBFBF;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                border-radius: 99px;
            }
            &.slick-active{
                width: 14px;
                button{
                border: 2px solid #FA541C;
            }
            }
        }
    }
`

function CarouselHomePage(props) {
    const {className} =props
    return (
        <CustomCarousel className={className}>
            <Carousel  >
                <div>
                    <Item image={imgBanner}/>
                </div>
                <div>
                    <Item image={imgBanner}/>
                </div>
                <div>
                    <Item image={imgBanner}/>
                </div>
                <div>
                    <Item image={imgBanner}/>
                </div>
            </Carousel>
        </CustomCarousel>
        
        
    )
}

export default CarouselHomePage
