if(number == 0 && this.current < 0.01) {
            this.current *= 10;
            this.current = `${this.current}${"0"}`

          }
          else if(number == 0 && this.current > 1.0) {
            this.current /= 100;
            this.current = `${this.current}${"0"}`

          }


          this.current = this.current === 0? (this.current = number): '' + this.current + number;