import { useEffect, useState } from "react";
import { authenticatedRequest } from "../../API/apiCall";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../../component/loading";

export function CreateOrganisationForm() {
  const [form, setForm] = useState({
    companyName: "",
    uen: "",
    registeredAddress: "",
    businessType: "",
    dateOfincorporation: "",
    natrueOfBusiness: "",
    StatusOfCompany: "",
    isActive: true,
    administrators: [] as number[],
  });

  const [users, setValidUser] = useState<Record<string, any>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [])
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === 'date' ? new Date(value) : type === 'number' ? Number(value) : value,
    }));
  };

  const toggleAdmin = (userId: number) => {
    setForm((prev) => {
      const exists = prev.administrators.includes(userId);
      const admins = exists
        ? prev.administrators.filter((id) => id !== userId)
        : [...prev.administrators, userId];
      return { ...prev, administrators: admins };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (form.administrators.length < 2) {
      setError("Organisation must to have atleast 2 administrators");
      return;
    }
    setError(null);
    setLoading(true)
    const response = await authenticatedRequest({
      path: 'organisation/new-organisation',
      method: "POST",
      data: form,
    }).catch(() => {
      setMessage("Error While Creating New Organisation")
    })

    if (response) {
      setMessage("Created New Organisation")
      setLoading(false)
      const timer = setTimeout(() => {
        navigate("/")
      }, 1000)
      return () => clearTimeout(timer)
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Create Organisation</h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Company Name</label>
                <input name="companyName" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">UEN</label>
                <input name="uen" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-12">
                <label className="form-label">Registered Address</label>
                <input name="registeredAddress" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Business Type</label>
                <input name="businessType" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Date Of Incorporation</label>
                <input type="date" name="dateOfincorporation" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Nature Of Business</label>
                <input name="natrueOfBusiness" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-6">
                <label className="form-label">Status Of Company</label>
                <input name="StatusOfCompany" className="form-control" onChange={handleChange} required/>
              </div>

              <div className="col-md-4">
                <label className="form-label">Company Size</label>
                <input type="number" name="companySize" className="form-control" min={0} onChange={handleChange} />
              </div>

              <div className="col-md-4">
                <label className="form-label">Paid Up Capital</label>
                <input name="paidUpCapital" className="form-control" onChange={handleChange} />
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h5>Administrators <small className="text-muted">(min 2)</small></h5>
              <div className="row">
                {users.length ? (users.map((u: Record<string, any>) => (
                  <div key={`"${u.id}"`} className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={form.administrators.includes(u.id)}
                        onChange={() => toggleAdmin(u.id)}
                      />
                      <label className="form-check-label">
                        {u.firstName} {u.lastName} <span className="text-muted">{u.mobileNumber}</span>
                      </label>
                    </div>
                  </div>
                ))) : (<div className="alert alert-primary" role="alert">
                  There is no any users availaible now.
                </div>)}
              </div>
            </div>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {message && <div className="alert alert-success mt-3">{message}</div>}
            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-primary px-4">
                {loading ? LoadingPage() : 'Create Organisation'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
