import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BackButton } from "../../components/BackButton";
import axios from "axios";

export { Page };
export { onBeforeRender };

function Page({ generateChart }) {
  const [chartInstance, setChartInstance] = useState(null);
  const [root, setRoot] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_API}/math/newton`,
      {
        fn: data.fn,
        x0: data.x0,
        n: data.n,
      }
    );

    if (chartInstance == null)
      setChartInstance((prevState) =>
        generateChart(
          "echart",
          [
            { source: res.data.data.coordinates },
            {
              transform: {
                type: "ecStat:regression",
                config: { method: "polynomial", order: res.data.data.order },
              },
            },
          ],
          "Newton Method"
        )
      );
    else {
      chartInstance.setOption({
        dataset: [
          { source: res.data.data.coordinates },
          {
            transform: {
              type: "ecStat:regression",
              config: { method: "polynomial", order: res.data.data.order },
              // 'end' by default
              // formulaOn: 'start'
            },
          },
        ],
      });
    }

    console.log(res.data.data);
    setRoot(res.data.data.root);
    setRows(res.data.data.rows);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-sm-9">
          <BackButton>
            <i className="fas fa-arrow-left"></i>
          </BackButton>
          <div className="row justify-content-center">
            <h4 className="text-center mb-3">Newton Method</h4>

            <form onSubmit={handleSubmit(onSubmit)} className="col-sm-6 mb-5">
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">F(X)</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    {...register("fn")}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">x0</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    {...register("x0")}
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">Iterations</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="text"
                    {...register("n")}
                  />
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary col-sm-4" type="submit">
                  Solve
                </button>
              </div>
            </form>

            <div id="echart"></div>

            {root && (
              <div className="text-center">
                <p>root X: {root}</p>
              </div>
            )}

            {rows && (
              <div className="mt-4">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>x0</th>
                      <th>xi</th>
                      <th>f(x0)</th>
                      <th>f(xi)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td>{row[0].toFixed(7)}</td>
                        <td>{row[1].toFixed(7)}</td>
                        <td>{row[2].toFixed(7)}</td>
                        <td>{row[3].toFixed(7)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function onBeforeRender() {
  const documentProps = {
    title: "Newton Method",
    description: "Newton Method Page",
  };
  return {
    pageContext: {
      documentProps,
    },
  };
}
