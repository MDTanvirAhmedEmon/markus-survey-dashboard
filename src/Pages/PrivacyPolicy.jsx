

import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Link } from 'react-router-dom';
import { IoArrowBackSharp } from 'react-icons/io5';
import { useCreateSettingMutation, useGetPrivacyPolicyQuery } from '../redux/features/Settings/Settings';
import toast from 'react-hot-toast';
const PrivacyPolicy = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [createPrivacy, { isLoading: loading }] = useCreateSettingMutation()
    const { data } = useGetPrivacyPolicyQuery()
    const handleTerms = () => {
        createPrivacy({ id: 2, description: content }).unwrap().then((res) => {
            toast.success(res.message)
        }).catch((err) => {
            toast.error(err.message || 'Something went wrong')
        })
    }

    const config = {
        readonly: false,
        placeholder: data?.description || 'Start typings...',
        style: {
            height: 400,
        }
    }
    useEffect(() => {
        setContent(data?.data?.description || '')
    }, [data])
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
                <button disabled={loading} onClick={handleTerms} className='px-8 py-2 rounded-2xl bg-[#ECB206] text-[var(--color-7)]' >Save</button>
            </div>
        </>
    )
}

export default PrivacyPolicy
