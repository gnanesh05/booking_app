import useFetch from '../../hooks/UseFetch'
import './Featured.css'

function Featured() {
    const {data, loading, error} = useFetch("/hotels/countByCity?cities=thanjavur,coimbatore")
    console.log(data)
  return (

    <div className='featured'>
              {
          loading ? ("Loading please wait") : (
            <>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/region/square250/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o=" alt="img" />
                    <div className="featuredTitles">
                        <h1>Goa</h1>
                        <h2>The Good Properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/city/square250/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="img" />
                    <div className="featuredTitles">
                        <h1>Jaipur</h1>
                        <h2>The Good Properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/city/square250/684732.webp?k=54bd15fa6a54076487fcca512f688f679d25b711afc6e4321904c1528dc5f731&o=" alt="img" />
                    <div className="featuredTitles">
                        <h1>Mussoorie</h1>
                        <h2>The Good Properties</h2>
                    </div>
                </div>

            </>)
      }
       
    </div>
  )
}

export default Featured