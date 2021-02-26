import React, { Component } from "react";
import Axios from "axios";

class Corona extends Component {
  state = {
    listNegara: [],
    negarapilihan: "",
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    loading: false,
  };

  componentDidMount() {
    Axios.get("https://covid19.mathdro.id/api/countries")
      .then((res) => {
        console.log(res);
        this.setState({ listNegara: res.data.countries });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderNegara = () => {
    return this.state.listNegara.map((val) => {
      return (
        <option key={val.iso2} value={val.name}>
          {val.name}
        </option>
      );
    });
  };

  onNegarachange = (e) => {
    this.setState({ negarapilihan: e.target.value, loading: true });
    Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
      .then((res) => {
        this.setState({
          loading: false,
          confirmed: res.data.confirmed.value,
          deaths: res.data.deaths.value,
          recovered: res.data.recovered.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <select
          className="form-control"
          value={this.state.negarapilihan}
          onChange={this.onNegarachange}
        >
          <option hidden value="">
            pilih negara
          </option>
          {this.renderNegara()}
        </select>

        <h2>
          {this.state.negarapilihan
            ? `Negara :${this.state.negarapilihan}`
            : null}
        </h2>
        <div className="mt-5 p-5 ">
          <div className="row">
            <div className="col-md-4 ">
              <div className="border border-primary">
                <div className="text-primary text-center">Confirmed</div>
                <h1 className="text-primary mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.confirmed}
                </h1>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border border-danger">
                <div className="text-danger text-center">Deaths</div>
                <h1 className="text-danger mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.deaths}
                </h1>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="border-success border">
                <div className="text-success text-center">Recovered</div>
                <h1 className="text-success mt-3 text-center">
                  {this.state.loading ? "Loading" : this.state.recovered}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Corona;
