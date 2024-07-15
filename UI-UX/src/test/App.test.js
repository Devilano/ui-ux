import axios from "axios";
import login_mock from "../mock/login_mock";
import parties_mock from "../mock/parties_mock";
const baseURL = "http://localhost:5000";



describe("Api Testing",() =>{
    it('Test Shlould Work ', async()=>{
        const response = await axios.get(`${baseURL}/test`);
        expect (response.status).toEqual(200);
        

    } )

    //login 
    it ("Login Should woork", async ()=>{
        const response = await axios.post(`${baseURL}/api/user/login`,login_mock)
        expect (response.status ).toEqual(200);
        expect (response.data.sucess).toEqual(true);
    })

    it("get All Progress",async()=>{
        const response=await axios.get(`${baseURL}/api/progress/get_progress`);
        expect(response.status).toEqual(200);
    })

    it("get All Progress",async()=>{
        const response=await axios.get(`${baseURL}/api/progress/get_progress`);
        expect(response.status).toEqual(200);
    })


    

    //  // Registration test
    //  it("Registration should work", async () => {
    //     const response = await axios.post(`${baseURL}/api/user/create`, register_mock);
    //     expect(response.status).toEqual(200);
    //     expect(response.data.success).toEqual(true);
    // });
     it("get All Progress",async()=>{
        const response=await axios.get(`${baseURL}/api/progress/get_progress`);
        expect(response.status).toEqual(200);
    })
    



    it("Fetch all parties", async () => {
        // Fetch all the parties, send request
        const response = await axios.get(`${baseURL}/api/party/get_party`);
        expect(response.status).toEqual(200);
    
        // Log response data to inspect structure
        console.log(response.data);
    
        // Ensure response.data.parties is an array
        if (Array.isArray(response.data.parties)) {
            // Matching each PersonParty name with the mock data
            response.data.parties.forEach((individualParties, index) => {
                expect(individualParties.personName).toEqual(parties_mock[index].personName);
            });
        } else {
            console.error("response.data.parties is not an array:", response.data.parties);
            // Fail the test if response.data.parties is not an array
            expect(Array.isArray(response.data.parties)).toBe(false);
        }
    });
   
    
    it("get single party  Should work",async()=>{
        const response=await axios.get(`${baseURL}/api/party/get_party/65abe1199d5af7a7d94db30e`);
        expect(response.status).toEqual(200);
    })

    it("get single Progress",async()=>{
        const response=await axios.get(`${baseURL}/api/progress/get_progress/65d44c687ab5a504959b4e82`);
        expect(response.status).toEqual(200);
    })

    it("get All Progress",async()=>{
        const response=await axios.get(`${baseURL}/api/progress/get_progress`);
        expect(response.status).toEqual(200);
    })
    

    it("get Single Vote",async()=>{
        const response=await axios.get(`${baseURL}/api/vote/get_vote/65d471a9c7909a51bb91539e`);
        expect(response.status).toEqual(200);
    })


    it("get All Vote",async()=>{
        const response=await axios.get(`${baseURL}/api/vote/get_vote`);
        expect(response.status).toEqual(200);
    })



})