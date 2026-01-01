import { useEffect, useState } from "react";
import { authenticatedRequest } from "../../API/apiCall";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../component/loading";
import { format } from "date-fns";

export function EditOrganisationForm() {
    const [form, setForm] = useState<any>(null);
    const [users, setValidUser] = useState<Record<string, any>[]>([]);
    const [disabledEdit, setDisableEdit] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { organisationId } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const data = await authenticatedRequest({
                path: `/organisation/${organisationId}`,
                method: 'GET'
            })

            if (data) {
                const fetchData = async () => {
                    const data = await authenticatedRequest({
                        path: 'user/list-valid-user-tobe-adminstrator',
                        method: 'GET',
                    })

                    if (data) {
                        setValidUser(data)
                    }
                }
                fetchData()
                setForm(data)
                setLoading(false)
            }
        }
        fetchData()
    }, [organisationId]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === 'date' ? new Date(value) : type === 'number' ? Number(value) : value,
        }));
        setDisableEdit(false)
    };

    const toggleAdmin = (userId: number) => {
        const exists = form.administrators.filter((e: any) => e.id === userId);
        setForm((prev: any) => {
            const admins = exists.length
                ? prev.administrators.filter((e: any) => e.id !== userId)
                : [...prev.administrators, ...users.filter((e: any) => e.id === userId)];
            return { ...prev, administrators: admins };
        });
        setValidUser((prev: any) => {
            const user = exists.length
                ? [...prev, ...exists] 
                : prev.filter((e: any) => e.id !== userId)
            return [...user];
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (form.administrators.length < 2) {
            setError("Organisation must have at least 2 administrators");
            return;
        }

        setError(null);
        setDisableEdit(true)

        const response = await authenticatedRequest({
            path: `organisation/update/${organisationId}`,
            method: "PUT",
            data: {...form, administrators: form.administrators.map((e:any) => e.id)},
        }).catch(() => {
            setError("Error While Updating New Organisation")
        })

        if (response) {
            setMessage("Updated New Organisation")
        }
    };

    if (loading) return <LoadingPage />;
    if (!form) return null;

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Company Name</label>
                    <input
                        name="companyName"
                        className="form-control"
                        value={form.companyName}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">UEN</label>
                    <input name="uen" className="form-control" value={form.uen} disabled />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Registered Address</label>
                    <input
                        name="registeredAddress"
                        className="form-control"
                        value={form.registeredAddress}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Business Type</label>
                    <input
                        name="businessType"
                        className="form-control"
                        value={form.businessType}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Date Of Incorporation</label>
                    <input
                        type="date"
                        name="dateOfincorporation"
                        className="form-control"
                        value={format(new Date(form.dateOfincorporation), "yyyy-MM-dd")}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Nature Of Business</label>
                    <input
                        name="natrueOfBusiness"
                        className="form-control"
                        value={form.natrueOfBusiness}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Status Of Company</label>
                    <input
                        name="StatusOfCompany"
                        className="form-control"
                        value={form.StatusOfCompany}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Company Size</label>
                    <input
                        type="number"
                        name="companySize"
                        className="form-control"
                        value={form.companySize}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Paid Up Capital</label>
                    <input
                        name="paidUpCapital"
                        className="form-control"
                        value={form.paidUpCapital}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <hr className="my-4" />

            <h5>Administrators (min 2)</h5>
            <div className="row" data-bs-spy="scroll">
                {[...form.administrators, ...users].map((u: any) => (
                    <div key={`"${u.id}${u.mobileNumber}"`} className="col-md-6">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                disabled={!users.length && form.administrators.length === 2 }
                                checked={form.administrators.map((e: any) => e.id).includes(u.id)}
                                onChange={() => toggleAdmin(u.id)}
                            />
                            <label className="form-check-label">
                                {u.firstName} {u.lastName} <span className="text-muted">{u.mobileNumber}</span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
            <div className="mt-4 text-end">
                <button type="submit" className="btn btn-primary" disabled={disabledEdit}>
                    Save Changes
                </button>
            </div>
        </form>
    );
}
