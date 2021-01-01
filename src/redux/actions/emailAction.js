import axios from "../../helpers/axios";

export const sendEmail = (email) => {   
    axios.post(`/admin/sendemail`,email);
    alert("Send Feed Back Successfully");
}