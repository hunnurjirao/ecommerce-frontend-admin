import React, { useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const EditProduct = (props) => {
    let location = useLocation();
    const history = useHistory();
    const [type, setType] = useState(location.state.productType)
    const [productName, setProductName] = useState(location.state.productName)
    const [productPrice, setProductPrice] = useState(location.state.productPrice)
    const [selectedFile, setSelectedFile] = useState()
    const [url, setUrl] = useState(location.state.productUrl)

    const notifyMessage = (msg) => toast.success(msg, {
        icon: '😀',
    });

    const onImageChange = (event) => {
        setSelectedFile(event.target.files[0])
        if (event.target.files && event.target.files[0]) {

            setUrl(URL.createObjectURL(event.target.files[0]))
        }
    }

    const editProduct = async () => {
        try {
            const res = await fetch('/editProduct', {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "productName": productName,
                    "productPrice": productPrice + '<=>' + type,
                    "productUrl": url,
                    "uid": location.state.uid
                })
            })

            if (res.status === 201) {

                notifyMessage('edited successfully')
                history.push('/')
            }

            else window.alert('something went wrong!')



        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className='container flex '>
            <div className='col-md-6 offset-md-3 mt-2' >
                <Toaster />
                <div className="input-group mb-3 mt-3">
                    {/* <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Product Name</span>
                </div> */}
                    <input type="text" onChange={(e) => setProductName(e.target.value)} value={productName} className="form-control" placeholder="Enter Product Name" aria-label="Username" aria-describedby="basic-addon1" />
                </div>

                <div className="input-group">
                    {/* <div className="input-group-append">
                    <span className="input-group-text">Product Price</span>
                </div> */}
                    <input type="number" className="form-control" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} placeholder="Enter Product Price" aria-label="Text input with segmented dropdown button" />
                    <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary">{type}</button>
                        <button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <p className="dropdown-item" onClick={() => { setType('Kg') }}>Kg</p>
                            <p className="dropdown-item" onClick={() => { setType('grams') }}>grams</p>
                            <p className="dropdown-item" onClick={() => { setType('Litre') }}>Litre</p>
                            <p className="dropdown-item" onClick={() => { setType('ml') }}>ml</p>
                            <p className="dropdown-item" onClick={() => { setType('each one') }}>each one</p>
                        </div>
                    </div>
                </div>

                {/* <div className="input-group mb-3 mt-3">
                    <div className="custom-file">
                        <input type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input" id="inputGroupFile04" onChange={onImageChange} />
                        {selectedFile ?
                            <label className="custom-file-label" htmlFor="inputGroupFile04">{selectedFile.name}</label>
                            :
                            <label className="custom-file-label" htmlFor="inputGroupFile04">Select an Image</label>
                        }
                    </div>
                    
                </div> */}

                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => { editProduct() }}>Confirm changes</button>
            </div>

        </div>
    )
}

export default EditProduct
