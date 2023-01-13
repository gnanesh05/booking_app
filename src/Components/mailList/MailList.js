import './MailList.css'

function MailList() {
  return (
    <div className='mail'>
        <h1 className="mailTitle">Save money save time</h1>
        <span className="mailDesc">Sign up to our newsletter</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='enter your mail' />
            <button>Subscribe </button>
        </div>
    </div>
  )
}

export default MailList