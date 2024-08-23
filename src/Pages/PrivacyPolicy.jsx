

import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
const PrivacyPolicy = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)
    const handleTerms = () => {
        console.log(content)
    }
    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
        }
    }
    return (
        <>
            <div className='start-center gap-2 mb-3'>
                <Link to={-1} className='bg-[#ECB206] py-1 px-2 rounded-md start-center gap-1 text-white'><IoArrowBackSharp />back</Link> <p>Privacy Policy</p>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
            </div>
            <div className='text-center mt-3'>
                <button disabled={isLoading} onClick={handleTerms} className='px-8 py-2 rounded-2xl bg-[#ECB206] text-[var(--color-7)]' >Save</button>
            </div>
        </>
    )
}

export default PrivacyPolicy
