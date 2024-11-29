import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        loading: false
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload,
                state.loading = false;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload,
                state.loading = false;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload,
                state.loading = false;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        removeJob: (state, action) => {
            const jobId = action.payload;
            state.allAdminJobs = state.allAdminJobs.filter((job) => job._id !== jobId)
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }

    }
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    removeJob,
    setAllAppliedJobs,
    setSearchedQuery,
    setLoading
} = jobSlice.actions;
export default jobSlice.reducer;