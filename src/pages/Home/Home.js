import './Home.css'
import Navbar from '../../Components/Navbar/Navbar.js'
import Header from '../../Components/Header/Header'
import Featured from '../../Components/Featured/Featured'
import PropertyList from '../../Components/propertyList/propertyList'
import FeaturedProperty from '../../Components/featuredProperty/featuredProperty'
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/footer/Footer'
export const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Featured Properties</h1>
        <FeaturedProperty/>
        <MailList/>
        <Footer/>
      </div>
    </div>
    
  )
}
