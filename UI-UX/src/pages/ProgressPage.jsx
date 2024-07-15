import React, { useEffect, useState } from 'react';
import { getAllProgressApi } from '../apis/Api';
import { Link } from 'react-router-dom';

const ProgressPage = () => {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        getAllProgressApi().then((res) => {
            console.log(res.data);
            setProgress(res.data.progress);
        });
    }, []);

    return (
        <div className="container" style={{marginTop:"180px"}}>
            <section className="features03 mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="content-head text-center">
                            <h4 className="mbr-section-title mb-0 display-2" style={{backgroundColor:"Yellow"}}><strong>News and  Progress</strong></h4>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {progress.map((item, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-3">
                            <div className="card mb-3">
                                <img src={item.newsImageUrl} className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title"><strong><a href="#">{item.newsTitle}</a></strong></h5>
                                    <p className="card-text">{item.date}</p>
                                    <p className="card-text">{item.sourceFrom}</p>
                                    <Link to="#" className="btn btn-primary">{item.publisher.slice(0, 10)}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ProgressPage;
