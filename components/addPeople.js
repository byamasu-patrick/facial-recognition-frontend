import React, { useState } from "react";
import axios from "axios";
import { convertSelectedImageToBase64 } from "../libs/utils/common";
import { useRouter } from "next/router";

const AddPeople = () => {

    const [firstName, setFirstName] = useState('');
    const [sirName, setSirName] = useState('');
    const [phone, setPhone] = useState('');
    const [idProfile, setIdProfile] = useState('');
    const [imageSelection, setImageSelection] = useState('Select your National ID');
    const [isImage, setIsImage] = useState(false);
    const router = useRouter();
    const [resultMsg, setResultMsg] = useState('Please fill the information below to add new people in the database');

    // id_profile = user_infos['id_picture']
    // first_name = user_infos["first_name"]
    // sir_name = user_infos["sir_name"]
    // phone = user_infos["phone"]
    const submitData = async () => {
        var result = await axios.post('http://localhost:5000/uploaddata', {
            id_picture: idProfile,
            first_name: firstName,
            sir_name: sirName,
            phone: phone
        });
        setFirstName('');
        setSirName('');
        setPhone('');

        console.log(result.data);
        setResultMsg(result.data['success']);

        setTimeout(() => {
            router.push("/verify");
        }, 5000);

        
    }
    return (
        <>
        <form action="/upload" method="POST" encType="multipart/form-data"
            onSubmit={(event) => {
                event.preventDefault();
                submitData();
            }}>
            
            <div className="flex w-full h-screen flex-col items-center justify-center">
                <div className="mt-7">
                    <p className="text-gray-700">{resultMsg}</p>
                </div>
                <div id="block-content" style={{visibility: "hidden"}} className="w-full bg-gray-200 h-1 fixed top-20">
                    <div className="bg-orange-400 h-1 progresss" style={{width: "2%", transition: ".3s ease-in-out"}}></div>
                </div>
                <div className="my-3">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="First Name"
                        value={firstName}
                        required
                        className={`appearance-none w-3/12 px-3 mx-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}                                                                        
                        onChange={(event) => {
                            setFirstName(event.target.value);
                        }}
                    />
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Sir Name"
                        value={sirName}
                        required
                        className={`appearance-none w-3/12 px-3 mx-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}                                                                        
                        onChange={(event) => {
                            setSirName(event.target.value);
                        }}
                    />
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="name"
                        placeholder="Phone"
                        value={phone}
                        required
                        className={`appearance-none w-3/12 px-3 mx-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}                                                                        
                        onChange={(event) => {
                            setPhone(event.target.value);
                        }}
                    />
                </div>
                <div>
                    {
                        isImage ? <img src={idProfile} alt="National ID here" className="my-4" width={100} height={80}/> : (<></>)
                    }
                    
                </div>
                
                <label className="w-6/12 flex flex-col items-center px-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-orange-900">
                    <svg className="w-8 h-8 mt-14" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal m-14 text-orange-400" id="file_name">{imageSelection}</span>
                    <input 
                        onChange={(event) => {
                            setIsImage(!isImage);
                            const files = event.currentTarget.files;
                            if (!files || !files[0]){
                                return;
                            }else{    
                                var fileName = event.target.value.split("\\");                                                                                     
                                setImageSelection(fileName[fileName.length - 1]);
                                convertSelectedImageToBase64(files[0], (result) => {
                                    setIdProfile(result);                          
                                });
                            }
                        }}
                        name="imageFile" 
                        id="imageFile" 
                        type="file" 
                        className="hidden" />
                    
                </label>
                <button 
                    type="submit" 
                    id="submit" 
                    className="bg-transparent m-4 w-auto hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded">
                    Upload Audio
                </button>
            </div>     
        </form>
        </>
    )
}

export default AddPeople;