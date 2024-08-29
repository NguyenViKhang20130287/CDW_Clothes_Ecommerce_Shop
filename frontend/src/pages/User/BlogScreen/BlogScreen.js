import React, {useEffect, useState} from 'react';
import './BlogScreen.css';
import APIService from "../../../services/APIService";
import {Link} from "react-router-dom";

const BlogScreen = () => {
    const [blogs, setBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const fetchBlogs = async () => {
        try {
            const response = await new APIService().fetchData(`/blog`);
            console.log(response);
            setBlogs(response.content);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    const truncateDescription = (description, limit) => {
        const words = description.split(' ');
        return words.length > limit ? words.slice(0, limit).join(' ') + '...' : description;
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="blog-screen">
            <aside className="sidebar">
                <h2 className={'search-title'}>Tìm kiếm blog</h2>
                <input type="text" placeholder="Tìm kiếm tiêu đề blog..." className="search-bar"
                       value={searchTerm}
                       onChange={handleSearchChange}/>
            </aside>
            <main className="blog-content">
                <h1 className="blog-title">TEELAB BLOG</h1>
                <div className="blog-list">
                    {filteredBlogs.map((blog) => (
                        <div className="blog-card" key={blog.id}>
                            <Link to={`/blog/${blog.id}`}>
                                <img className="blog-thumbnail" src={blog.thumbnail} alt={blog.title}/>
                                <h2 className="blog-item-title">{blog.title}</h2>
                                <p className="blog-description">{truncateDescription(blog.description, 20)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
);
}

export default BlogScreen;
