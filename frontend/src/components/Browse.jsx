import React, { useEffect ,useState} from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/UseGetAllJobs';

 //onst randomJobs = [1, 2,3];

const Browse = () => {
    useGetAllJobs();
    const {allJobs,searchedQuery} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
       
     if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
      useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results {allJobs.length}</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                     allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                        )
                       })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse