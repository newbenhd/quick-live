import React from "react";

export default () => (
  <div className="page dashboard">
    <header className="header">
      <h3>Dashboard</h3>
    </header>
    <form>
      <div className="form-group">
        <label htmlFor="srcNpmPackage">Search by npm package</label>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter npm package..." aria-label="Recipient's username"
                 aria-describedby="button-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" >Search</button>
          </div>
        </div>
      </div>
    </form>
    <form>
      <div className="form-group">
        <label htmlFor="srcPackageJson">Upload package.json file</label>
        <input type="file" className="form-control-file" id="srcPackageJson"/>
      </div>
    </form>
  </div>
);
