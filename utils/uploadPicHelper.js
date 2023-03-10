import axios from "axios";

const picUploader = async media => {
    try {
        const form = new FormData();
        form.append("file", media);
        form.append("upload_preset", "connectSphere");
        form.append("cloud_name", "SHIRISHTI JAIN");

        const res = await axios.post(process.env.CLOUDINARY_URL, form);
        return res.data.url;
    } catch (error) {
        return;
    }
}

export default picUploader;