
document.getElementById('userForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/usuarios/mongodb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      console.log('Usuário cadastrado com sucesso no MongoDB!');

      const neo4jResponse = await fetch('http://localhost:3000/usuarios/neo4j', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      if (neo4jResponse.ok) {
        console.log('Usuário cadastrado no Neo4j com sucesso!');
        window.location.href = 'login.html'; 
      } else {
        console.error('Erro ao cadastrar usuário no Neo4j:', neo4jResponse.statusText);
      }
    } else {
      const errorData = await response.json();
      console.error('Erro ao cadastrar usuário no MongoDB:', errorData.error);
    }
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
  }
});
