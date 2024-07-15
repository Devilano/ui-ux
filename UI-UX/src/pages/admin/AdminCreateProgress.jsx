import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {  createProgressApi, deleteProgressApi, getAllProgressApi } from '../../apis/Api'
import { Link } from 'react-router-dom'

const AdminCreateProgress = () => {

    //  make useState 
    const [newsTitle, setNewsTitle] = useState('')
    const [publisher, setPublisher] = useState('')
    const [sourceFrom, setSourceFrom] = useState('')
    const [date, setDate] = useState('')

    const [newsImage, setNewsImage] = useState(null)

    const [previewImage, setPreviewImage] = useState(null)

    // useEffect for fetching all the products and showing in table
    const [progress, setProgress] = useState([])
    useEffect(() => {
        getAllProgressApi().then((res) => {
            console.log(res.data);
            setProgress(res.data.progress);
        })
    }, [])

    // assign for every input box

    const changeNTtitle = (e) => {
        setNewsTitle(e.target.value)
    }

    const changePublisher = (e) => {
        setPublisher(e.target.value)
    }

    const changeSrcFrom = (e) => {
        setSourceFrom(e.target.value)
    }

    const changeDDate = (e) => {
        setDate (e.target.value)

    }
    
    

    // function for image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0] 
        setNewsImage(file)
        setPreviewImage(URL.createObjectURL(file))

    }
    

    // handle submit 
    const handleSubmit = (e) => {
        e.preventDefault()
        // form data is nit needed here in react but for image no needed


        // making logical form data 
        const formData = new FormData();
        formData.append('newsTitle', newsTitle)// destruction name from backend
        formData.append('sourceFrom', sourceFrom)
        formData.append('publisher', publisher)

        formData.append('date', date)
        formData.append('newsImage', newsImage)
        console.log(formData)


        // making Api call
        createProgressApi(formData).then((res) => {
            if (res.data.success == false) {
                toast.error(res.data.message)
            } else {
                toast.success(res.data.message)
            }

        }).catch(e => {
            toast.error("Server Error");
            console.log(e);
        }

        )
    }

    //delete Party Function
    const handleDelete = (id) =>{
        const confirmDialog = window.confirm("Are you sure want to delete")
        if (!confirmDialog){
            return;
        }else{
            //make api call
            deleteProgressApi(id).then((res)=>{
                if(res.data.sucess== true){
                    toast.success(res.data.message)
                    window.location.reload()
                }else{
                    toast.error(res.data.message)
                }
            })


        }
    }

    return (
        <>
            <div className='m-4' >
                <div className='d-flex justify-content-between'style={{marginTop:"180px"}} >
                    <h2>
                        Admin ProgressDashboard
                    </h2>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Details
                    </button>

                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">List</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form action="" method="post" className='form-control m-2 p-2'>
                                        <input type="text" onChange={changeNTtitle} className='form-control mb-2' placeholder='News Title' />
                                        <input type="text" onChange={changeSrcFrom} className='form-control mb-2' placeholder='Source From' />
                                        <input type="text" onChange={changePublisher} className='form-control mb-2' placeholder='Publisher' />
                                        <input type="text" onChange={changeDDate} className='form-control mb-2' placeholder='Date' />

                                        <input type="file" onChange={handleImageUpload} alt="image" width="48" height="48" />


                                        {
                                            previewImage && <img className='img-fluid rounded object-fit-fit' src={previewImage} alt='newsImage' height={50} width={50} />
                                        }


                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary rounded" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary rounded" onClick={handleSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <table className="table table-stripped  mt-2">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">News Image</th>
                            <th scope="col">News Title</th>
                            <th scope="col">Source</th>
                            <th scope="col">Date</th>
                            <th scope="col">Publisher</th>


                        </tr>
                    </thead>
                    <tbody>

                        {
                            progress.map((item) => (<tr>
                                <td><img src={item.newsImageUrl} height={20} width={20} alt="" /></td>

                                <td>{item.newsTitle}</td>
                                <td>{item.sourceFrom}</td>
                                <td>{item.date}</td>

                                <td>{item.publisher.slice(0, 10)}</td>
                                <td><div className='btn-group' role='group'>
                                    <Link to ={`/admin/edit/${item._id}`} className='btn btn-success'>Edit</Link>
                                    <button onClick={()=>handleDelete(item._id)} className='btn rounded btn-danger'>Delete</button>
                                </div>
                                </td> 
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AdminCreateProgress