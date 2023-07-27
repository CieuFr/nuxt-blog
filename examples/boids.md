---
date: 22/04/2023
description: Boids est le nom d'un programme informatique de vie artificielle, développé par Craig W. Reynolds en 1986, simulant le comportement d'une nuée d'oiseaux en vol. Dans cette article, nous allons implémenter ce comportement avec TypeScript.
tags: [ts]
---

# Simuler des nuées d'oiseaux avec TypeScript

Boids est le nom d'un programme informatique de vie artificielle, développé par Craig W. Reynolds en 1986, simulant le comportement d'une nuée d'oiseaux en vol. Dans cette article, nous allons implémenter ce comportement avec TypeScript. Le code de l'article est disponible sur [GitHub](https://github.com/azaismarc/boids-ts)

Nous nous baserons sur le peudocode de [kfish](http://www.kfish.org/boids/pseudocode.html).

![boids](/boids/images/boids.gif)

## Le comportement des boids

Le comportement des boids est basé sur trois règles simples :
- **Cohésion :** les boids essaient de rester proches des autres boids
- **Séparation :** les boids essaient de rester à une certaine distance des autres boids
- **Alignement :** les boids essaient d'avoir la même direction que les autres boids

## Implémentation

### Mise en place

Pour commencer, nous allons créer un projet TypeScript avec [Vite](https://vitejs.dev/).

```bash
yarn create vite boids-ts --template vanilla-ts
```

Ensuite, nous allons ajouter un dossier boids dans le dossier src et créer les fichiers suivants :
```bash
src/boids
├── boid.ts # Classe Boid
├── Flock.ts # Classe Flock
├── Vector.ts # Classe Vector
└── type.ts # Types
```

### La classe Vector

La classe Vector représente un vecteur dans un espace à deux dimensions. C'est notre value object qui va nous permettre de manipuler les positions et les vitesses des boids.

```typescript
/**
 * Represents a vector in 2D space
 * @class Vector
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
export default class Vector {

    constructor(readonly x: number, readonly y: number) {
       
    }

    /**
     * Returns a vector with x and y set to 0
     **/
    static vector_null(): Vector {
        return new Vector(0, 0);
    }

    /**
     * Adds two vectors
     * @param {Vector} v - vector to add
     * @returns {Vector} - the sum of the two vectors
     */
    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    /**
     * Subtracts two vectors
     * @param {Vector} v - vector to subtract
     * @returns {Vector} - the difference of the two vectors
     */
    substr(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    /**
     * Divides a vector by a scalar
     * @param {number} n - scalar to divide by
     * @returns {Vector} - the result of the division
     * @throws {Error} - if n is 0
     */
    div(n: number): Vector {
        if (n === 0) throw new Error("Cannot divide by 0");
        return new Vector(this.x / n, this.y / n);
    }

    /**
     * Multiplies a vector by a scalar
     * @param {number} n - scalar to multiply by
     * @returns {Vector} - the result of the multiplication
     */
    mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    /**
     * Returns the magnitude of the vector
     * @returns {number} - the magnitude of the vector
     */
    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns euclidean distance between two vectors
     * @param {Vector} v - vector to calculate distance to
     * @returns {number} - the distance between the two vectors
     */
    dist(v: Vector): number {
        return this.substr(v).mag();
    }

    /**
     * Returns the angle of the vector
     * @returns {number} - the angle of the vector
     */
    angle(): number {
        return Math.atan2(this.y, this.x);
    }
}
```

### Les interfaces Size et Param

Nous allons exporter deux interfaces pour représenter la taille de la fenêtre et les paramètres de la simulation dans le fichier type.ts.

```typescript
export interface Size {
    height: number;
    width: number;
}

export interface Param {
    cohesion: number;
    separation: number;
    alignment: number;
    speed: number;
}
```

### La classe Boid

#### Le constructeur

La classe Boid représente un boid. Elle contient les propriétés suivantes :
- **position :** vecteur position du boid
- **velocity :** vecteur vitesse du boid
- **id :** l'identifiant du boid

```typescript
export default class Boid {
    constructor(
        readonly id: number,
        private position: Vector,
        private velocity: Vector
    ) {}
}
```

#### La cohésion

La cohésion est la règle qui permet aux boids de rester proches les uns des autres. Pour l'implémenter, soustraire la position du boid à la position moyenne des autres boids et multiplier le résultat par un paramètre de cohésion.

```typescript
/**
 * Apply cohesion rule to the boid
 * @param {Boid[]} flock - array of boids in the flock
 * @param {number} cohesion - cohesion parameter
 * @returns {Vector} - cohesion vector
 */
private cohesion(flock: Boid[], cohesion: number): Vector {
    let v = Vector.vector_null();
    if (cohesion === 0) return v;
    for (const boid of flock) {
        if (boid.id === this.id) continue;
        v = v.add(boid.position);
    }
    v = v.div(flock.length - 1);
    return v.substr(this.position).mult(cohesion);
}
```

#### La séparation

La séparation est la règle qui permet aux boids de rester à une certaine distance les uns des autres. Pour l'implémenter, lorsque la distance entre deux boids est inférieure à la distance de séparation, ajouter la différence entre les deux positions au vecteur de séparation.

```typescript
/**
 * Apply separation rule to the boid
 * @param {Boid[]} flock - array of boids in the flock
 * @param {number} separation - separation parameter
 * @returns {Vector} - separation vector
 */
private separation(flock: Boid[], separation: number): Vector {
    let v = Vector.vector_null();
    if (separation === 0) return v;
    for (const boid of flock) {
        if (boid.id === this.id) continue;
        if (this.position.dist(boid.position) > separation) continue;
        v = v.add(this.position.substr(boid.position));
    }
    return v;
}
```

#### L'alignement

L'alignement est la règle qui permet aux boids de se diriger dans la même direction. Pour l'implémenter, soustraire la vitesse du boid à la vitesse moyenne des autres boids et multiplier le résultat par un paramètre d'alignement.

```typescript
/**
 * Apply alignment rule to the boid
 * @param {Boid[]} flock - array of boids in the flock
 * @param {number} alignment - alignment parameter
 * @returns {Vector} - alignment vector
 */
private alignment(flock: Boid[], alignment: number): Vector {
    let v = Vector.vector_null();
    if (alignment === 0) return v;
    for (const boid of flock) {
        if (boid.id === this.id) continue;
        v = v.add(boid.velocity);
    }
    v = v.div(flock.length - 1);
    return v.substr(this.velocity).mult(alignment);
}
```

#### Limiter la vitesse

Pour limiter la vitesse des boids, il faut vérifier que la vitesse est inférieure à la vitesse maximale. Si ce n'est pas le cas, diviser la vitesse du boid par la magnitude du vecteur vitesse et multiplier le résultat par la vitesse maximale.

```typescript
/**
 * Apply speed limit to the boid
 * @param {number} speed - speed limit
 */
private limit_velocity(speed: number): void {

    if (speed === 0) {
        this.velocity = Vector.vector_null();
        return;
    }

    const mag = this.velocity.mag();
    if (mag < speed) return;
    this.velocity = this.velocity.div(mag).mult(speed);
}
```

#### Limiter la position

Pour éviter que les boids sortent de la fenêtre, il faut vérifier que la position du boid est comprise dans la fenêtre. Si ce n'est pas le cas, on ajoute un coefficient à la vitesse du boid pour le faire tourner vers l'intérieur de la fenêtre.

```typescript
/**
 * Apply position limit to the boid
 * @param {Size} size - size of the canvas
 */
private limit_position(size: Size): void {
    const margin = 50;
    const turn = 1;
    let vx = this.velocity.x;
    let vy = this.velocity.y;
    if (this.position.x < margin) vx += turn;
    if (this.position.x > size.width - margin) vx -= turn;
    if (this.position.y < margin) vy += turn;
    if (this.position.y > size.height - margin) vy -= turn;
    
    this.velocity = new Vector(vx, vy)
}
```

#### Mettre à jour la position

Enfin, pour mettre à jour la position du boid :
- ajouter les vecteurs de cohésion, de séparation et d'alignement à la vitesse du boid
- limiter la vitesse du boid
- ajouter la vitesse au vecteur position
- limiter la position du boid.

```typescript
/**
 * Move the boid
 * @param {Boid[]} flock - array of boids in the flock
 * @param {Size} size - size of the canvas
 * @param {Param} param - parameters of the simulation
 */
move(flock: Boid[], size: Size, param: Param) {
    const v1 = this.cohesion(flock, param.cohesion);
    const v2 = this.separation(flock, param.separation);
    const v3 = this.alignment(flock, param.alignment);
    this.velocity = this.velocity.add(v1).add(v2).add(v3);
    this.limit_velocity(param.speed);
    this.position = this.position.add(this.velocity);
    this.limit_position(size);
}
```

#### Dessiner le boid

On ajoutera la méthode draw qui dessinera nos boids sous forme de triangles.

```typescript
/**
 * Draw the boid
 * @param {CanvasRenderingContext2D} ctx - canvas context
 */
draw(ctx: CanvasRenderingContext2D): void {
    // Rotate the canvas to the direction of the boid
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.velocity.angle());
    ctx.translate(-this.position.x, -this.position.y);

    // Draw the boid
    ctx.fillStyle = Boid.color;
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.position.x - 15, this.position.y + 5);
    ctx.lineTo(this.position.x - 15, this.position.y - 5);
    ctx.lineTo(this.position.x, this.position.y);
    ctx.closePath();
    ctx.fill();

    // Restore the canvas
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(-this.velocity.angle());
    ctx.translate(-this.position.x, -this.position.y);
}
```

### La classe Flock

La classe Flock représentera notre nuée de boids. Elle contiendra un tableau de boids et les méthodes pour les créer, les mettre à jour et les afficher.

```typescript
/**
 * A flock is a collection of boids
 * @class Flock
 * @param {number} n - number of boids in the flock
 * @param {Size} size - size of the canvas
 */
export default class Flock {

    private flock: Boid[] = [];

    constructor(n: number, size: Size) {
        for (let i = 0; i < n; i++) {
            const pos_x = Math.random() * size.width;
            const pos_y = Math.random() * size.height;
            const position = new Vector(pos_x, pos_y);
            const vel_x = -10 + Math.random() * 20;
            const vel_y = -10 + Math.random() * 20;
            const velocity = new Vector(vel_x, vel_y);
            const boid = new Boid(i, position, velocity);
            this.flock.push(boid);
        }
    }

    /**
     * Move all boids in the flock 
     * @param {Size} size - size of the canvas
     * @param {Param} param - parameters for the boids
     */
    move(size: Size, param: Param) {
        for (const boid of this.flock) {
            boid.move(this.flock, size, param);
        }
    }

    /**
     * Draw all boids in the flock
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    draw(ctx: CanvasRenderingContext2D) {
        for (const boid of this.flock) {
            boid.draw(ctx);
        }
    }
}
```

## La simulation

Après avoir implémenter nos classes dans le fichier main.ts, créer la page index.html et modifier le fichier style.css, il n'y a plus qu'à exécuter la simulation !

**Essayer de supprimer une des règles de la simulation et observer comment les boids réagissent !**