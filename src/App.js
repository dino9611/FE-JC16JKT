import React from "react";

import "./App.css";

class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1
          style={{ color: this.props.warna ? this.props.warna : "blueviolet" }}
        >
          {this.props.kata ? this.props.kata : "hellow"} {this.props.angka}
        </h1>
        <button onClick={() => this.props.onReset(50)}>reset</button>
      </div>
    );
  }
}

const Welcome = (props) => {
  return <h3>{props.nama}</h3>;
};

class App extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.OnTambahClick=this.OnTambahClick.bind(this)
  // }

  state = {
    angka: 100,
    nama: "dino",
  };

  componentDidMount() {
    console.log("masuk didmount");
    // * digunakan untuk fetching data atau mengambil data dari backend
    // this.setState({ angka: 10 });
  }

  componentDidUpdate(prevprops, prevstate) {
    console.log("ini didupdate");
    if (prevstate.angka !== this.state.angka) {
      this.setState({ nama: "rahman" });
    }
    // * melakukan sesuatu pada perbuhan data tertentu
    // ! gunakanlah didupdate saat terjadi perubahan data tertentu yang menyebabkan data yang lain harus dirubah
  }

  jumlahkan = (a, b) => {
    return a + b;
  };

  // * state itu untuk menyimpan data disebuah komponen
  // * setstate itu untuk mengubang state di dalam komponen

  OnTambahClick = (tambah) => {
    // let angkasekarang=this.state.angka + 1
    this.setState((prevstate) => {
      // * prevstate berisi state sebelumnya
      return { angka: prevstate.angka + tambah }; // * harus return object
    });
  };

  onKurangClick = (kurang) => {
    let angkasekarang = this.state.angka - kurang;
    this.setState({ angka: angkasekarang });
  };

  onReset = (resetangka) => {
    this.setState({ angka: resetangka });
  };

  render() {
    console.log("render");
    return (
      <div>
        <center>
          <Hello
            kata={this.state.nama}
            warna="black"
            angka={this.state.angka}
            onReset={this.onReset}
          />
          <Hello angka={this.state.angka} onReset={this.onReset} />
          <Hello
            kata="brobro"
            warna="blue"
            onReset={this.onReset}
            angka={this.state.angka}
          />
          <Welcome nama="Willy" />
          <Welcome nama="ZUl" />
          <Welcome nama="Derian" />
          <h2>{this.jumlahkan(100, 8)}</h2>

          <div>
            <button className="m-x" onClick={() => this.onKurangClick(1)}>
              -
            </button>
            <button className="m-x" onClick={() => this.onKurangClick(2)}>
              -2
            </button>
            {this.state.angka}
            <button className="m-x" onClick={() => this.OnTambahClick(2)}>
              +2
            </button>
            <button className="m-x" onClick={() => this.OnTambahClick(1)}>
              +
            </button>
          </div>
        </center>
      </div>
    );
  }
}

export default App;
