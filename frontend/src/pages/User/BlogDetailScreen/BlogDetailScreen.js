import React, { useEffect, useState } from 'react';
import './BlogDetailScreen.css';
import APIService from "../../../services/APIService";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";

const BlogDetailScreen = () => {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState({})
    const date = new Date(blogDetail.createdBy);
    const hasHTMLTags = /<[^>]*>/.test(blogDetail.content);
    const hasHTMLTagsInDescription = /<[^>]*>/.test(blogDetail.description);

    const fetchBlogDetail = async () => {
        try {
            const response = await new APIService().fetchData(`/blog/${id}`);
            setBlogDetail(response);
            console.log(response.createdAt)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogDetail();
    }, [id])

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }
    console.log(blogDetail)
    return (
        <div>
            {blogDetail ? (
                <div className="blog-detail">
                    <h1 className="blog-title">{blogDetail.title}</h1>
                    <div className="blog-meta">
                        <Avatar src={blogDetail.createdBy ? blogDetail.createdBy.userInformation.avatar : null}/>
                        <div className="blog-meta-info">
                            <span
                                className="blog-author">{blogDetail.createdBy ? blogDetail.createdBy.username : 'Unknown'}</span>
                            <span className="blog-date">{formatDate(blogDetail.createdAt)}</span>
                        </div>
                    </div>
                    {hasHTMLTagsInDescription ?
                        <div dangerouslySetInnerHTML={{__html: blogDetail.description}} /> :
                        <p>{blogDetail.description}</p>
                    }
                    <img className="blog-thumbnail" src={blogDetail.thumbnail} alt={blogDetail.title}/>
                    <div className="blog-content">
                        {hasHTMLTags ?
                            <div dangerouslySetInnerHTML={{__html: blogDetail.content}}/> :
                            <p>{blogDetail.content}</p>
                        }
                    </div>
                </div>
            ) : <div className={"empty-product-detail"}>Không có blog phù hợp</div>}
        </div>
    );
}

export default BlogDetailScreen;
