import { Link} from 'react-router-dom'

export default function Mode(){
    return (
      <>
        <div className='container'>
          <div className="row">
            <div className='col-sm-4-offset-4'>
              <form className='border border-primary'>
                <h3 className='text-center mt-5'>Choose Mode </h3><br/>
        
               
                <div className="text-center">
                <button type="submit" className="btn btn-primary text-white bg-primary">
                    <Link to={"/game"} style={{color:"white" ,  textDecoration : "none"}}>Two players same time</Link>
                </button>
                </div><br/>
                <div className="text-center">
                <button type="submit" className="btn btn-primary text-white bg-primary">
                    <Link to={"/gameAuto"} style={{color:"white" , textDecoration : "none"}}>Automatic Update</Link>
                </button>
                </div><br/>
              </form>
            </div>
          </div>
        </div>
      </>
    )
}