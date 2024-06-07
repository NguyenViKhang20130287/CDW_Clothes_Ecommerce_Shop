import React, { useEffect, useState } from 'react';
import './BlogDetailScreen.css';
import APIService from "../../../services/APIService";
import { useParams } from "react-router-dom";

const BlogDetailScreen = () => {
    const { id } = useParams();
    const [blogDetail, setBlogDetail] = useState({})

    const fetchBlogDetail = async () => {
        try {
            const response = await new APIService().fetchData(`/blog/${id}`);
            setBlogDetail(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogDetail();
    }, [id])

    console.log(blogDetail)
    return (
        <div className="blog-detail">
            <h1 className="blog-title">{blogDetail.title}</h1>
            <div className="blog-meta">
                <span className="blog-author"> Đăng bởi: {blogDetail.createdBy.username}</span>
                <span className="blog-date"> on {new Date(blogDetail.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="blog-description">{blogDetail.description}</p>
            <img className="blog-thumbnail" src={blogDetail.thumbnail} alt={blogDetail.title} />
            <div className="blog-content">{blogDetail.content}</div>
        </div>
    );
}

export default BlogDetailScreen;
