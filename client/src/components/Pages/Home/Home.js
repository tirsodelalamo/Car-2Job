import React from 'react'

import imageMoney from '../../../public/pngflow.com.png'
import peopleInCar from '../../../public/PinClipart.com_car-rental-clipart_1329195.png'
import skyline from '../../../public/oie_oLycOr08VxN6.png'
import line from '../../../public/line.png'
import imageGreen from '../../../public/pngfuel.com.png'

import "bootstrap/dist/css/bootstrap.min.css"
import './Home.css'


const Home = () => {

    return (
        <main className = "home">
            <h1>CAR2JOB</h1>
            <p>Comparte tu trayecto al trabajo</p>
            <div className= "lineContainer">
            <img className = "line" src={line} alt="line"/>
            </div>
            <section className = "articleContainer">
                <img src={imageGreen} alt="imageGreen" className="imageHome"></img>
                <article>
                    <h3>¡Piensa en Verde!</h3>
                    <p>Menos tráfico, menos CO2.</p>  
                </article>
            </section>
            <section className = "articleContainer">
                <article>
                    <h3>¡Haz amigos!</h3>
                    <p>Aprovecha el trayecto para conocer gente.</p>  
                </article>
                <img src={peopleInCar} alt="peopleincar" className="imageHome"></img>
            </section>
            <section className = "articleContainer">
                <img src={imageMoney} alt="imageMoney" className="imageHome"></img>
                <article>
                    <h3>¡Ahorra!</h3>
                    <p>El combustible es más barato entre 2...</p>  
                </article>
            </section>
            <section className = "lastSection">
                <img className="mainImage" src= {skyline} alt="mainImage"></img>
            </section>
        </main>
    )
}

export default Home

