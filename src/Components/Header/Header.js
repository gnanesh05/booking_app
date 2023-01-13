import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtlas, faBed,  faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {useState} from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'


const Header = ({type}) => {
    const [openDate, setOpenDate] = useState(false)
    const[destination, setDestination] = useState("")
    const[openOptions, setopenOptions ] = useState(false)
    const[options, setOptions] = useState({
        adult:1,
        children:0,
        room: 1
    })

    const [date, setDate]  = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const handler = (option, type)=>{
        setOptions((prev)=>{
            return {
                ...prev,
                [option] : type === 'i' ? options[option] + 1 : options[option] - 1,
            }
        })
    }

    const navigate = useNavigate()
    const handleSearch = ()=>{
        navigate('/hotels', {state:{destination, date, options}})
    }
  return (
    <div className='header'>
        <div className={type==='list'? "headerContainer listMode": "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                <FontAwesomeIcon icon={faBed} />
                <span>Stays</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Rental Cars</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faAtlas} />
                <span>Attraction</span>
                </div>
                <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Taxi</span>
                </div>
            </div>

            <h1 className="headerTitle">
                A lifetime of discounts.
            </h1>
            <p className="headerDesc">
                Get rewards for your travels, avail 10% or more instant savings with free account!
            </p>
            <button className="headerBtn">Register/Sign In</button>
            
            {
                type !== 'list' ? (
                    <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                     <input type="text"
                     placeholder='where are you going?'
                     className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                        <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "mm/dd/yyyy")} to ${format(date[0].endDate, "mm/dd/yyyy")} `}</span>
                        {
                            openDate &&( <DateRange 
                                editableDateInputs = {true}
                                onChange = {item=>setDate([item.selection])}
                                moveRangeOnFirstSelection = {false}
                                ranges = {date}
                                minDate = {new Date()}
                                className = 'date'
                                ></DateRange>)
                        }
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
                        <span className='headerSearchText' onClick={()=>setopenOptions(!openOptions)}>{`${options.adult} adults ,
                         ${options.children} children, ${options.room} rooms`}</span>
                         {
                             openOptions && ( <div className="options">
                             <div className="optionItem">
                                 <span className="optionText">Adult</span>
                                 <button className="optionCounterButton" disabled={options.adult <=1} onClick={()=>handler("adult",'d')} >-</button>
                                 <span className="optionCounterNumber">{options.adult}</span>
                                 <button className="optionCounterButton" onClick={()=>handler("adult",'i')}>+</button>
                             </div>
                             <div className="optionItem">
                                 <span className="optionText">Children</span>
                                 <button className="optionCounterButton" disabled={options.children <=0} onClick={()=>handler("children",'d')}>-</button>
                                 <span className="optionCounterNumber">{options.children}</span>
                                 <button className="optionCounterButton"onClick={()=>handler("children",'i')}>+</button>
                             </div>
                             <div className="optionItem">
                                 <span className="optionText">Rooms</span>
                                 <button className="optionCounterButton" disabled={options.room <=1} onClick={()=>handler("room",'d')}>-</button>
                                 <span className="optionCounterNumber">{options.room}</span>
                                 <button className="optionCounterButton" onClick={()=>handler("room",'i')}>+</button>
                             </div>
                         </div>)
                         }
                        
                    </div>  
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>  
                </div>
                ) : (<></>)
            }
        </div>

    </div>
  )
}

export default Header