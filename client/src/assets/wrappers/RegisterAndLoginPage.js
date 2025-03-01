import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 80vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
    /* padding: -10px; */
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
  .credentials-box {
    background: rgb(0, 0, 0);
    color: white; /* Ensures text is visible in dark mode */
    border: 1px solid #ddd;
    border-radius: 5px;
    max-width: 250px;
    margin: 0 auto 1rem;
    text-align: center;
    font-size: 0.9rem;
  }
  .credentials-box p {
    color: white; /* Ensures visibility in light mode */
  }
`;
export default Wrapper;
